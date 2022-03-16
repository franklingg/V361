class TaskListsController < ApplicationController
  before_action :set_task_list, only: %i[ show update destroy ]

  # GET /task_lists
  def index
    @task_lists = TaskList.all

    render json: @task_lists
  end

  # GET /task_lists/1
  def show
    render json: @task_list
  end

  # POST /task_lists
  def create
    @task_list = TaskList.new(task_list_params)

    if @task_list.save
      render json: @task_list, status: :created, location: @task_list
    else
      render json: @task_list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /task_lists/1
  def update
    if @task_list.update(task_list_params)
      render json: @task_list
    else
      render json: @task_list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /task_lists/1
  def destroy
    @task_list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_list
      @task_list = TaskList.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_list_params
      params.require(:task_list).permit(:name, :color).with_defaults(color: "#FFF")
    end
end
