# Deployment Commands for Google Cloud Run

## Prerequisites
1. Install Google Cloud CLI: https://cloud.google.com/sdk/docs/install
2. Authenticate: `gcloud auth login`
3. Set project: `gcloud config set project YOUR_PROJECT_ID`
4. Enable APIs:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

## Option 1: Direct Deployment (Simplest)
```bash
# Deploy directly from source code
gcloud run deploy vietnamese-lunar-calendar \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0
```

## Option 2: Build and Deploy Separately
```bash
# Build container image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/vietnamese-lunar-calendar

# Deploy to Cloud Run
gcloud run deploy vietnamese-lunar-calendar \
  --image gcr.io/YOUR_PROJECT_ID/vietnamese-lunar-calendar \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0
```

## Option 3: Using Cloud Build (CI/CD)
```bash
# Submit build using cloudbuild.yaml
gcloud builds submit --config cloudbuild.yaml
```

## Environment Variables (if needed)
```bash
# Add environment variables during deployment
gcloud run deploy vietnamese-lunar-calendar \
  --image gcr.io/YOUR_PROJECT_ID/vietnamese-lunar-calendar \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_API_BASE_URL=https://adl-cms-735256194233.asia-southeast1.run.app"
```

## Notes
- Replace `YOUR_PROJECT_ID` with your actual Google Cloud Project ID
- The app will be available at: https://vietnamese-lunar-calendar-[random-hash]-uc.a.run.app
- Default region `asia-southeast1` is optimal for Vietnam users
- Memory and CPU can be adjusted based on usage
- Set `--min-instances 1` if you want to avoid cold starts (costs more)