locals {
  use_existing_cert = var.acm_certificate_arn != ""
  use_alias         = var.domain_name != "" && (local.use_existing_cert || var.hosted_zone_id != "")
}
resource "aws_cloudfront_origin_access_control" "oac" {
  name = "my-oac"
}
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "my-oac-${random_id.oac_suffix.hex}"
  # name                              = "${var.s3_bucket_name}-oac"
  description                       = "OAC for S3 origin"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "Static site for ${var.domain_name != "" ? var.domain_name : var.s3_bucket_name}"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Managed-CachingOptimized
  }

  default_root_object = "index.html"

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  viewer_certificate {
    acm_certificate_arn             = local.use_alias ? (local.use_existing_cert ? var.acm_certificate_arn : aws_acm_certificate_validation.cert[0].certificate_arn) : null
    cloudfront_default_certificate  = local.use_alias ? false : true
    ssl_support_method              = "sni-only"
    minimum_protocol_version        = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = local.use_alias ? [var.domain_name] : []
}

# Bucket policy allowing CloudFront access via OAC
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid      = "AllowCloudFrontOAC",
        Effect   = "Allow",
        Principal = { Service = "cloudfront.amazonaws.com" },
        Action   = ["s3:GetObject"],
        Resource = "${aws_s3_bucket.site.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      }
    ]
  })
}
