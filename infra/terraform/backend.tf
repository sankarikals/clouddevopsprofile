backend "s3" {
  bucket         = "terraform-state-terraformcicd"
  key            = "staticwebsite/terraform.tfstate"
  region         = "ap-south-1"
  #dynamodb_table = "terraform-lock"
}
