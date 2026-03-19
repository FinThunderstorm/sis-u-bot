terraform {
  required_version = ">= 1.0.11"
  backend "s3" {
    bucket         = "alanendev-terraform-state"
    key            = "sisubot.tfstate"
    region         = "eu-north-1"
    encrypt        = true
    dynamodb_table = "alanendev-terraform-locks"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.36.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.22.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "acm"
  region = "us-east-1"
}

provider "cloudflare" {
}
