locals {
  lambda_payload_filename = "${path.module}/../api/target/sis-u-bot-api-0.1.0-SNAPSHOT-standalone.jar"
}

resource "aws_lambda_function" "api" {
  filename         = local.lambda_payload_filename
  function_name    = "sis-u-bot-api"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "Sisubot::handler"
  runtime          = "java25"
  memory_size      = 512
  source_code_hash = base64sha256(filebase64(local.lambda_payload_filename))

  tags = {
    Environment = "production"
    Name        = "sis-u-bot-api"
  }
}

resource "aws_lambda_function_url" "api" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["https://${var.domain_name}"]
    allow_methods     = ["POST"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}

locals {
  api_origin_id = "api-sisubot-alanendev-origin-id"
}

resource "aws_cloudfront_distribution" "api" {
  origin {
    domain_name = aws_lambda_function_url.api.function_url
    origin_id   = local.api_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "api-sisubot-alanendev"

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "api-sisubot-alanendev-cf"
  }

  aliases = [var.api_domain_name]

  default_cache_behavior {
    allowed_methods = ["POST", "HEAD"]
    cached_methods  = ["POST", "HEAD"]

    target_origin_id = local.api_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["RU", "CN"]
    }
  }

  tags = {
    Environment = "production"
    Name        = "api-sisubot-alanendev-cf"
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.api.arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2018"
    ssl_support_method             = "sni-only"
  }
}