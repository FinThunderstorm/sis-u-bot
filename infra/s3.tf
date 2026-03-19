resource "aws_s3_bucket" "app" {
  bucket = "sisubot-alanendev-bucket"
  tags = {
    Environment = "production"
    Name        = "sisubot-alanendev-bucket"
  }
}

resource "aws_s3_bucket" "logs" {
  bucket = "sisubot-alanendev-logs-bucket"
  tags = {
    Environment = "production"
    Name        = "sisubot-cf-logs"
  }
}

resource "aws_s3_bucket_ownership_controls" "app" {
  bucket = aws_s3_bucket.app.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "app" {
  depends_on = [aws_s3_bucket_ownership_controls.app]

  bucket = aws_s3_bucket.app.id
  acl    = "private"
}

resource "aws_s3_bucket_acl" "logs" {
  depends_on = [aws_s3_bucket_ownership_controls.logs]

  bucket = aws_s3_bucket.logs.id
  acl    = "private"
}

resource "aws_s3_bucket_website_configuration" "app_website_conf" {
  bucket = aws_s3_bucket.app.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_versioning" "app_versioning" {
  bucket = aws_s3_bucket.app.id
  versioning_configuration {
    status = "Enabled"
  }
}