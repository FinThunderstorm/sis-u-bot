output "s3_bucket_address" {
  value       = aws_cloudfront_distribution.app.domain_name
  description = "Straight anonymized address to the S3 bucket"
}

