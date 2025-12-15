terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Default provider for regional resources
provider "aws" {
  region = var.app_region
}

# CloudFront and ACM must be in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
