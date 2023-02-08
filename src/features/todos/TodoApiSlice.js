import { apiSlice } from "../../app/api/apiSlice"

export const todosApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Todo'],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => ({
                url: '/todo',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
        }),    
        createTodo: builder.mutation({
            query: initialUserData => ({                
                url: '/todo',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'Todo', id: "LIST" }
            ]
        }),    
        updateTodo: builder.mutation({
            query: initialUserData => ({                
                url: '/todo',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todo`,
                method: 'DELETE',
                body: { id }
            }),            
            invalidatesTags: (result, error, arg) => [
                { type: 'Todo', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetTodosQuery,    
    useCreateTodoMutation,
    useUpdateTodoMutation,    
    useDeleteTodoMutation,
} = todosApiSlice
