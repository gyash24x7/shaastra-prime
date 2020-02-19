import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AddSubDepartmentInput = {
  id: Scalars['Int'],
  subDept: Scalars['String'],
};

export type Channel = {
   __typename?: 'Channel',
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  createdAt: Scalars['String'],
  archived: Scalars['Boolean'],
  messages: Array<Message>,
  createdBy: User,
  members: Array<User>,
  media: Array<Media>,
};

export type CreateUserInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  rollNumber: Scalars['String'],
  mobile: Scalars['String'],
  upi: Scalars['String'],
  departmentId: Scalars['Int'],
};

export type Department = {
   __typename?: 'Department',
  id: Scalars['ID'],
  name: Scalars['String'],
  subDepartments: Array<Scalars['String']>,
  members: Array<User>,
};

export type ForgotPasswordInput = {
  rollNumber: Scalars['String'],
  newPassword: Scalars['String'],
  passwordOTP: Scalars['String'],
};

export type LoginInput = {
  rollNumber: Scalars['String'],
  password: Scalars['String'],
};

export type Media = {
   __typename?: 'Media',
  id: Scalars['ID'],
  url: Scalars['String'],
  type: MediaType,
  uploadedBy: User,
  channel: Channel,
};

export enum MediaType {
  Image = 'IMAGE',
  Audio = 'AUDIO',
  Video = 'VIDEO',
  Doc = 'DOC',
  Code = 'CODE'
}

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  content: Scalars['String'],
  createdAt: Scalars['String'],
  createdBy: User,
  channel: Channel,
  starred: Scalars['Boolean'],
  status: MessageStatus,
  reactions: Array<Reaction>,
};

export enum MessageStatus {
  NotSent = 'NOT_SENT',
  Sent = 'SENT',
  Delivered = 'DELIVERED',
  Received = 'RECEIVED',
  Read = 'READ'
}

export type Mutation = {
   __typename?: 'Mutation',
  createDepartment: Department,
  addSubDepartment: Department,
  createUser: Scalars['Boolean'],
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  verifyUser: Scalars['Boolean'],
  sendPasswordOTP: Scalars['Boolean'],
  forgotPassword: Scalars['Boolean'],
};


export type MutationCreateDepartmentArgs = {
  name: Scalars['String']
};


export type MutationAddSubDepartmentArgs = {
  data: AddSubDepartmentInput
};


export type MutationCreateUserArgs = {
  data: CreateUserInput
};


export type MutationLoginArgs = {
  data: LoginInput
};


export type MutationVerifyUserArgs = {
  data: VerifyUserInput
};


export type MutationSendPasswordOtpArgs = {
  rollNumber: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput
};

export type Query = {
   __typename?: 'Query',
  getDepartments: Array<Department>,
  getUsers: Array<User>,
  me?: Maybe<User>,
};

export type Reaction = {
   __typename?: 'Reaction',
  id: Scalars['ID'],
  type: ReactionType,
  by: User,
  message: Message,
};

export enum ReactionType {
  Love = 'LOVE',
  Like = 'LIKE',
  Haha = 'HAHA',
  Angry = 'ANGRY',
  Sad = 'SAD'
}

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  rollNumber: Scalars['String'],
  profilePic: Scalars['String'],
  coverPic: Scalars['String'],
  mobile: Scalars['String'],
  upi: Scalars['String'],
  about: Scalars['String'],
  role: UserRole,
  verified: Scalars['Boolean'],
  department: Department,
  messages: Array<Message>,
  media: Array<Media>,
  channels: Array<Channel>,
};

export enum UserRole {
  Coord = 'COORD',
  Head = 'HEAD',
  Core = 'CORE',
  Cocas = 'COCAS',
  Cocad = 'COCAD'
}

export type VerifyUserInput = {
  rollNumber: Scalars['String'],
  otp: Scalars['String'],
};

export type CreateUserMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  departmentId: Scalars['Int'],
  rollNumber: Scalars['String'],
  mobile: Scalars['String'],
  upi: Scalars['String']
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

export type LoginMutationVariables = {
  rollNumber: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'name' | 'id'>
    ) }
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type VerifyUserMutationVariables = {
  rollNumber: Scalars['String'],
  otp: Scalars['String']
};


export type VerifyUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyUser'>
);

export type GetDepartmentsQueryVariables = {};


export type GetDepartmentsQuery = (
  { __typename?: 'Query' }
  & { getDepartments: Array<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'name' | 'subDepartments'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'rollNumber' | 'mobile' | 'role' | 'verified'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name'>
    ) }
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!, $departmentId: Int!, $rollNumber: String!, $mobile: String!, $upi: String!) {
  createUser(data: {name: $name, email: $email, password: $password, rollNumber: $rollNumber, mobile: $mobile, departmentId: $departmentId, upi: $upi})
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      departmentId: // value for 'departmentId'
 *      rollNumber: // value for 'rollNumber'
 *      mobile: // value for 'mobile'
 *      upi: // value for 'upi'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($rollNumber: String!, $password: String!) {
  login(data: {rollNumber: $rollNumber, password: $password}) {
    id
    name
    department {
      name
      id
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      rollNumber: // value for 'rollNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($rollNumber: String!, $otp: String!) {
  verifyUser(data: {rollNumber: $rollNumber, otp: $otp})
}
    `;
export type VerifyUserMutationFn = ApolloReactCommon.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      rollNumber: // value for 'rollNumber'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, baseOptions);
      }
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = ApolloReactCommon.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;
export const GetDepartmentsDocument = gql`
    query GetDepartments {
  getDepartments {
    id
    name
    subDepartments
  }
}
    `;

/**
 * __useGetDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDepartmentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, baseOptions);
      }
export function useGetDepartmentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, baseOptions);
        }
export type GetDepartmentsQueryHookResult = ReturnType<typeof useGetDepartmentsQuery>;
export type GetDepartmentsLazyQueryHookResult = ReturnType<typeof useGetDepartmentsLazyQuery>;
export type GetDepartmentsQueryResult = ApolloReactCommon.QueryResult<GetDepartmentsQuery, GetDepartmentsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    rollNumber
    mobile
    role
    verified
    department {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;