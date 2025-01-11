class Api::V1::BucketsController < ApplicationController
  before_action :set_bucket, only: [:show, :update, :destroy]

  # GET /api/v1/buckets
  def index
    buckets = Bucket.includes(:tasks).all
    render json: buckets.as_json(include: :tasks)
  end

  # GET /api/v1/buckets/:id
  def show
    render json: @bucket.as_json(include: :tasks)
  end

  # POST /api/v1/buckets
  def create
    bucket = Bucket.new(bucket_params)
    if bucket.save
      render json: bucket, status: :created
    else
      render json: { errors: bucket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/buckets/:id
  def update
    if @bucket.update(bucket_params)
      render json: @bucket
    else
      render json: { errors: @bucket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/buckets/:id
  def destroy
    @bucket.destroy
    render json: { message: 'Bucket deleted successfully' }
  end

  private

  def set_bucket
    @bucket = Bucket.find(params[:id])
  end

  def bucket_params
    params.require(:bucket).permit(:name, :description, :status)
  end
end
