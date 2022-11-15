import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const user_id = getUserId(event)

    // TODO: Implement creating a new TODO item

    const { name, dueDate } = newTodo;

    if (!name) throw new Error('Name is not allowed to be empty')
    if (!dueDate) throw new Error('Due Date is not allowed to be empty')

    const item = await createTodo(user_id, newTodo)

    return {
      statusCode: 201,
      body: JSON.stringify({ item })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
