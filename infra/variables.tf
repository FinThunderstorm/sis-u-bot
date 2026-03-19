variable "environment" {
  type = "string"
  default = "production"
}

variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "base_domain_name" {
  type    = string
  default = "alanen.dev"
}

variable "domain_name" {
  type    = string
  default = "sis-u-bot"
}

variable "api_domain_name" {
  type    = string
  default = "api.sis-u-bot"
}
