import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const UsersList = () => {
    useTitle('techNotes: Users List')

    const {
        //data: users,
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        //pollingInterval: 60000,
        //refetchOnFocus: true,
        refetchOnFocus: false,
        //refetchOnWindowFocus : false
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = data
        
        const tableContent = ids?.length && ids.map(Id => <User key={Id} userId={Id} />)

        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">UserName</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default UsersList