require "test_helper"

class TaskListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_list = task_lists(:one)
  end

  test "should get index" do
    get task_lists_url, as: :json
    assert_response :success
  end

  test "should create task_list" do
    assert_difference("TaskList.count") do
      post task_lists_url, params: { task_list: { color: @task_list.color, name: @task_list.name } }, as: :json
    end

    assert_response :created
  end

  test "should show task_list" do
    get task_list_url(@task_list), as: :json
    assert_response :success
  end

  test "should update task_list" do
    patch task_list_url(@task_list), params: { task_list: { color: @task_list.color, name: @task_list.name } }, as: :json
    assert_response :success
  end

  test "should destroy task_list" do
    assert_difference("TaskList.count", -1) do
      delete task_list_url(@task_list), as: :json
    end

    assert_response :no_content
  end
end
