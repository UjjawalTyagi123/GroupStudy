import { useMutation, useQuery,useQueryClient } from "react-query";
import axios from 'axios'

export const fetchUsers=()=>{
    return axios.get('http://localhost:3000/Users')
}

const addUsers=(user)=>{
    return axios.post('http://localhost:3000/Users',user)
}
export const useUserData=(onSuccess,onError)=>{
    return useQuery('users',fetchUsers,{
        onSuccess,
        onError,
    })
}

export const useAddUsersData=()=>{
    const queryClient=useQueryClient()
    return useMutation(addUsers,{
        onSuccess:(data)=>{
                    queryClient.setQueryData('users',(oldQueryData)=>{
            return {   // it append the cache and use that data without hitting a new network request
                ...oldQueryData,
                data:[...oldQueryData.data,data.data]
            }
           })
        }
    })
}