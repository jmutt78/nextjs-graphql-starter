import React from 'react';
import { Box, Flex, Icon, Img } from '@chakra-ui/react';
import { MdHome, MdEmail, MdEventNote, MdNote } from 'react-icons/md';
import { ImUsers, ImQuotesRight, ImBookmark } from 'react-icons/im';

import ActiveLink from './ActiveLink';
import { useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { ProfileAvatar } from './Profile/ProfileAvatar';

export const SideBar = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  if (loading) {
  }

  return (
    <Flex
      bg='gray.200'
      width={{ base: '300px', md: '300px', lg: '300px' }}
      height={{ base: '100%', md: '100%', lg: '100%' }}
      flexDirection='column'
      justifyContent='space-between'
    >
      <Flex
        mt={{ base: '0', md: '30px', lg: '30px' }}
        fontWeight={600}
        fontSize={19}
        flexDirection='column'
      >
        <Img
          boxSize='110px'
          w='100%'
          objectFit='cover'
          src='/static/QA_Cursive_Logo.png'
          alt='Logo'
          mx='auto'
        />

        <Box mx='auto'>
          <ActiveLink href='/'>
            <Icon as={MdHome} mr={2} mb='5px' />
            Dashboards
          </ActiveLink>

          {/* for users */}

          {/* For admin */}
        </Box>
      </Flex>
      <Flex
        mt={{ base: '0', md: '50px', lg: '50px' }}
        mb={14}
        justifyContent='flex-end'
      >
        {data && <ProfileAvatar email={data.me?.email} />}
      </Flex>
    </Flex>
  );
};
