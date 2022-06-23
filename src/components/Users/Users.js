import React from "react";
import Pagination from "../common/Paginator/Pagination";
import User from "./User";


let Users = (props) => {
    return (
        <div>
            <Pagination pageSize={props.pageSize}
                        totalItemsCount={props.totalUserCount}
                        currentPage={props.currentPage}
                        onPageChanged={props.onPageChanged}
                        portionSize={props.portionSize}

            />
            <div>
                {
                    props.users.map(u => <User user={u}
                                               followingInProgress={props.followingInProgress}
                                               follow={props.follow}
                                               unFollow={props.unFollow}
                                               key={u.id}
                        />
                    )
                }
            </div>

        </div>
    )
}

export default Users;