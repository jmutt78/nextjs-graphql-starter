import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';
import EMailActivity from '../components/Mail_Activity';
import { useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import UsersMailsActivities from '../components/UserMailActivity';
const Index = () => {
  useIsAuth();
  const [userId, setUserId] = useState(0);
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  useEffect(() => {
    console.log(data?.me);
    if (data) {
      if (data?.me !== null) {
        if (data?.me?.role !== 'admin') {
          setUserId(data!.me!.id);
        }
      }
    }
  }, [data]);
  return <Layout></Layout>;
};

export default withApollo({ ssr: false })(Index);
