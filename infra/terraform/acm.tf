locals {
  create_cert = var.domain_name != "" && var.acm_certificate_arn == "" && var.hosted_zone_id != ""
}

resource "aws_acm_certificate" "cert" {
  provider          = aws.us_east_1
  count             = local.create_cert ? 1 : 0
  domain_name       = var.domain_name
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

# If using Route53, create DNS validation records automatically
resource "aws_route53_record" "cert_validation" {
  count   = local.create_cert && var.hosted_zone_id != "" ? length(aws_acm_certificate.cert[0].domain_validation_options) : 0
  zone_id = var.hosted_zone_id
  name    = aws_acm_certificate.cert[0].domain_validation_options[count.index].resource_record_name
  type    = aws_acm_certificate.cert[0].domain_validation_options[count.index].resource_record_type
  records = [aws_acm_certificate.cert[0].domain_validation_options[count.index].resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  provider        = aws.us_east_1
  count           = local.create_cert && var.hosted_zone_id != "" ? 1 : 0
  certificate_arn = aws_acm_certificate.cert[0].arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}
