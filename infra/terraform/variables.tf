variable "app_region" {
  description = "AWS region for S3 and regional resources"
  type        = string
  default     = "ap-south-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket to host the static site"
  type        = string
}

variable "domain_name" {
  description = "Custom domain for the site (optional). Leave empty to use CloudFront default domain"
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Route53 Hosted Zone ID for the domain (optional)."
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "Optional: Existing ACM certificate ARN in us-east-1 to use with CloudFront. If empty and domain_name is set, Terraform will request a new cert."
  type        = string
  default     = ""
}
