class Api::V1::TasksController < ApplicationController
  before_action :set_bucket
  before_action :set_task, only: [:update, :destroy]

  # POST /api/v1/buckets/:bucket_id/tasks
  def create
    task = @bucket.tasks.new(task_params)
    if task.save
      render json: task, status: :created
    else
      render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/buckets/:bucket_id/tasks/:id
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/buckets/:bucket_id/tasks/:id
  def destroy
    @task.destroy
    render json: { message: 'Task deleted successfully' }
  end

  private

  def set_bucket
    @bucket = Bucket.find(params[:bucket_id])
  end

  def set_task
    @task = @bucket.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :status)
  end
end
