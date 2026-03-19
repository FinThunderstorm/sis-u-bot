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
    Environment = var.environment
    Name        = "sis-u-bot-api"
  }
}

resource "aws_lambda_function_url" "api" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["https://${var.domain_name}.${var.base_domain_name}"]
    allow_methods     = ["POST"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}

