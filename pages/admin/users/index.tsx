import LatestUserTable from "@/components/admin/LatestUserTable";
import PageNavigator from "@/components/common/PageNavigator";
import AdminLayout from "@/components/layout/AdminLayout";
import { LatestUserProfile } from "@/utils/types";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {}

const limit = 5;
let currentPageNo = 0;

const Users: NextPage<Props> = () => {
  const [users, setUsers] = useState<LatestUserProfile[]>();
  const [reachedToEnd, setReachedToEnd] = useState(false);

  // fetching all comments
  const fetchAllUsers = (pageNo = currentPageNo) => {
    axios(`/api/user/?pageNo=${pageNo}}&limit=${limit}`)
      .then(({ data }) => {
        if (!data.users.length) {
          currentPageNo -= 1;
          return setReachedToEnd(true);
        }

        setUsers(data.users);
      })
      .catch((err) => console.log(err));
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo++;
    fetchAllUsers(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchAllUsers(currentPageNo);
  };

  useEffect(fetchAllUsers, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl dark:text-primary text-primary-dark font-semibold py-2 transition">
        Users
      </h1>
      <LatestUserTable users={users} />
      <div className="py-10 flex justify-end">
        <PageNavigator
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
