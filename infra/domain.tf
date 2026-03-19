data "cloudflare_zone" "alanendev" {
  name = var.base_domain_name
}

resource "aws_acm_certificate" "app" {
  provider          = aws.acm
  domain_name       = "${var.domain_name}.${var.base_domain_name}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "api" {
  provider          = aws.acm
  domain_name       = "${var.api_domain_name}.${var.base_domain_name}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "cloudflare_record" "validation" {
  count   = length(aws_acm_certificate.app.domain_validation_options)
  zone_id = data.cloudflare_zone.alanendev.id
  name    = tolist(aws_acm_certificate.app.domain_validation_options)[count.index].resource_record_name
  value   = trimsuffix(tolist(aws_acm_certificate.app.domain_validation_options)[count.index].resource_record_value, ".")
  type    = tolist(aws_acm_certificate.app.domain_validation_options)[count.index].resource_record_type
  ttl     = 1
  proxied = false

  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "acm_validation" {
  provider                = aws.acm
  certificate_arn         = aws_acm_certificate.app.arn
  validation_record_fqdns = cloudflare_record.validation[*].hostname
}

resource "cloudflare_record" "api_validation" {
  count   = length(aws_acm_certificate.api.domain_validation_options)
  zone_id = data.cloudflare_zone.alanendev.id
  name    = tolist(aws_acm_certificate.api.domain_validation_options)[count.index].resource_record_name
  value   = trimsuffix(tolist(aws_acm_certificate.api.domain_validation_options)[count.index].resource_record_value, ".")
  type    = tolist(aws_acm_certificate.api.domain_validation_options)[count.index].resource_record_type
  ttl     = 1
  proxied = false

  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "api_acm_validation" {
  provider                = aws.acm
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = cloudflare_record.api_validation[*].hostname
}

resource "cloudflare_record" "sisubot" {
  zone_id = data.cloudflare_zone.alanendev.id
  name    = "sis-u-bot"
  value   = aws_cloudfront_distribution.app.domain_name
  type    = "CNAME"
  proxied = false
}

resource "cloudflare_record" "sisubot_api" {
  zone_id = data.cloudflare_zone.alanendev.id
  name    = "api.sis-u-bot"
  value   = aws_cloudfront_distribution.api.domain_name
  type    = "CNAME"
  proxied = false
}
