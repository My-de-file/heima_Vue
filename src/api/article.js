import axios from '@/utils/myaxios.js'



export const articleTitle = ()=>{
    return axios ({
        url:'/category'
    })
}

export const addpost = (params)=>{
    return axios ({
        url:'/post',
        params
    })
}

export const getArticleDetail = (id)=>{
    return axios ({
        url:`/post/${id}`
    })
}

export const attention1 = (id)=>{
    return axios ({
        url:`/user_follows/${id}`
    })
}

export const Unfriended = (id)=>{
    return axios ({
        url:`/user_unfollow/${id}`
    })
}

export const Like = (id)=>{
    return axios ({
        url:`/post_like/${id}`
    })
}

export const collect1 = (id)=>{
    return axios ({
        url:`/post_star/${id}`
    })
}
export const comment = (id,data)=>{
    return axios ({
        method:'post',
        url:`/post_comment/${id}`,
        data
    })
}
export const comment1 = (id,params)=>{
    return axios ({
        url:`/post_comment/${id}`,
        params
    })
}
export const Myconcern = ()=>{
    return axios ({
        url:`/user_follows`
    })
}
export const enshrine = ()=>{
    return axios ({
        url:`/user_star`
    })
}
export const comments = ()=>{
    return axios ({
        url:'/user_comments'
    })
}




// /user_comments