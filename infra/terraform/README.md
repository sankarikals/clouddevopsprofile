# Infrastructure as Code (Terraform + GitHub Actions)

This folder provisions AWS resources for hosting the static site built by Vite.

Resources:
- S3 bucket for static hosting (private, accessed via CloudFront OAC)
- CloudFront distribution (TLS via ACM in us-east-1)
- ACM certificate (DNS-validated)
- Optional Route53 records for custom domain

CI/CD:
- GitHub Actions pipeline to build, provision Terraform, sync `dist/` to S3, and invalidate CloudFront.

Prerequisites:
- AWS account with IAM role for GitHub OIDC
- (Optional) Route53 hosted zone for your domain
- Configure repository secrets: `AWS_ROLE_TO_ASSUME`, `AWS_REGION`, `TF_STATE_BUCKET` (optional), `S3_BUCKET`, `CF_DIST_ID` (first run will output this), `TF_STATE_KEY` (optional)

Steps:
1. Commit this folder.
2. Push to `main`. The workflow will run `terraform init/plan/apply`, build the site, upload to S3, and invalidate CloudFront.
3. First run requires manual ACM DNS validation if Route53 is not managed by Terraform.
