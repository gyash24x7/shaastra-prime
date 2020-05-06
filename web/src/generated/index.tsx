import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddSubDepartmentInput = {
  deptId: Scalars['String'];
  subDeptName: Scalars['String'];
};

export type AddUserToChannelInput = {
  channelId: Scalars['String'];
  userId: Scalars['String'];
};

export type Channel = {
   __typename?: 'Channel';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['String'];
  archived: Scalars['Boolean'];
  type: ChannelType;
  members: Array<User>;
  createdBy: User;
};

export enum ChannelType {
  Group = 'GROUP',
  Direct = 'DIRECT'
}

export type CreateChannelInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  members: Array<Scalars['String']>;
};

export type CreateMessageInput = {
  channelId: Scalars['String'];
  content: Scalars['String'];
  media: Array<Scalars['String']>;
  mediaType: Scalars['String'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  rollNumber: Scalars['String'];
  mobile: Scalars['String'];
  departmentId: Scalars['String'];
};

export type Department = {
   __typename?: 'Department';
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName: Scalars['String'];
  members: Array<User>;
  tasksAssigned: Array<Task>;
  tasksCreated: Array<Task>;
  updates: Array<Update>;
  invoicesSubmitted: Array<Invoice>;
  subDepartments: Array<Scalars['String']>;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  passwordOTP: Scalars['String'];
};

export type GetMessagesInput = {
  channelId: Scalars['String'];
  skip: Scalars['Float'];
  first: Scalars['Float'];
};

export type Invoice = {
   __typename?: 'Invoice';
  id: Scalars['ID'];
  title: Scalars['String'];
  date: Scalars['String'];
  invoiceNumber: Scalars['String'];
  amount: Scalars['String'];
  purpose: Scalars['String'];
  status: InvoiceStatus;
  type: InvoiceType;
  media: Media;
  activity: Array<InvoiceActivity>;
  uploadedBy: User;
  byDept: Department;
  vendor: Vendor;
};

export type InvoiceActivity = {
   __typename?: 'InvoiceActivity';
  id: Scalars['ID'];
  type: InvoiceActivityType;
  on: Scalars['String'];
  invoice: Invoice;
};

export enum InvoiceActivityType {
  Uploaded = 'UPLOADED',
  Edited = 'EDITED',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export enum InvoiceStatus {
  Coord = 'COORD',
  Head = 'HEAD',
  Core = 'CORE',
  FinManager = 'FIN_MANAGER',
  FinCore = 'FIN_CORE',
  Cocad = 'COCAD'
}

export enum InvoiceType {
  Reimbursement = 'REIMBURSEMENT',
  Settlement = 'SETTLEMENT',
  DirectPayment = 'DIRECT_PAYMENT'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
   __typename?: 'Media';
  id: Scalars['ID'];
  url: Scalars['String'];
  type: MediaType;
  uploadedBy: User;
};

export enum MediaType {
  Image = 'IMAGE',
  Audio = 'AUDIO',
  Video = 'VIDEO',
  Doc = 'DOC'
}

export type Message = {
   __typename?: 'Message';
  id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: User;
  starred: Scalars['Boolean'];
  likes: Scalars['Int'];
  media: Array<Media>;
  type: MessageType;
};

export enum MessageType {
  System = 'SYSTEM',
  Text = 'TEXT',
  Media = 'MEDIA',
  TaskActivity = 'TASK_ACTIVITY',
  InvoiceActivity = 'INVOICE_ACTIVITY'
}

export type Mutation = {
   __typename?: 'Mutation';
  addUserToChannel: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
  deleteChannel: Scalars['Boolean'];
  updateChannel: Scalars['Boolean'];
  addsubDepartment: Scalars['Boolean'];
  createDepartment: Department;
  createUser: User;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  sendPasswordOTP: Scalars['Boolean'];
  uploadCoverPic: Scalars['Boolean'];
  uploadProfilePic: Scalars['Boolean'];
  verifyUser: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  updateMessage: Scalars['Boolean'];
};


export type MutationAddUserToChannelArgs = {
  data: AddUserToChannelInput;
};


export type MutationCreateChannelArgs = {
  data: CreateChannelInput;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['String'];
};


export type MutationUpdateChannelArgs = {
  data: UpdateChannelInput;
};


export type MutationAddsubDepartmentArgs = {
  data: AddSubDepartmentInput;
};


export type MutationCreateDepartmentArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSendPasswordOtpArgs = {
  email: Scalars['String'];
};


export type MutationUploadCoverPicArgs = {
  coverPic: Scalars['String'];
};


export type MutationUploadProfilePicArgs = {
  profilePic: Scalars['String'];
};


export type MutationVerifyUserArgs = {
  data: VerifyUserInput;
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationUpdateMessageArgs = {
  data: UpdateMessageInput;
};

export type Query = {
   __typename?: 'Query';
  getChannels: Array<Channel>;
  getUsers: Array<User>;
  me?: Maybe<User>;
  getDepartments: Array<Department>;
  getMessages: Array<Message>;
};


export type QueryGetChannelsArgs = {
  type: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  data: GetMessagesInput;
};

export type Task = {
   __typename?: 'Task';
  id: Scalars['ID'];
  brief: Scalars['String'];
  details: Scalars['String'];
  byDept: Department;
  forDept: Department;
  createdBy: User;
  assignedTo: Array<User>;
  status: TaskStatus;
  createdAt: Scalars['String'];
  deadline: Scalars['String'];
  media: Array<Media>;
  activity: Array<TaskActivity>;
};

export type TaskActivity = {
   __typename?: 'TaskActivity';
  id: Scalars['ID'];
  type: TaskActivityType;
  task: Task;
  createdAt: Scalars['String'];
};

export enum TaskActivityType {
  NotAssigned = 'NOT_ASSIGNED',
  Assigned = 'ASSIGNED',
  InProgress = 'IN_PROGRESS',
  Submitted = 'SUBMITTED',
  Completed = 'COMPLETED'
}

export enum TaskStatus {
  NotAssigned = 'NOT_ASSIGNED',
  Assigned = 'ASSIGNED',
  InProgress = 'IN_PROGRESS',
  Submitted = 'SUBMITTED',
  Completed = 'COMPLETED'
}

export type Update = {
   __typename?: 'Update';
  id: Scalars['ID'];
  brief: Scalars['String'];
  subject: Scalars['String'];
  content: Scalars['String'];
  byDept: Department;
  postedBy: User;
  createdAt: Scalars['String'];
};

export type UpdateChannelInput = {
  channelId: Scalars['String'];
  archived: Scalars['Boolean'];
  description: Scalars['String'];
};

export type UpdateMessageInput = {
  messageId: Scalars['String'];
  starred: Scalars['Boolean'];
  like: Scalars['Boolean'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  rollNumber: Scalars['String'];
  profilePic: Scalars['String'];
  coverPic: Scalars['String'];
  mobile: Scalars['String'];
  upi: Scalars['String'];
  about: Scalars['String'];
  role: UserRole;
  verified: Scalars['Boolean'];
  department: Department;
};

export enum UserRole {
  Coord = 'COORD',
  Head = 'HEAD',
  Core = 'CORE',
  Cocas = 'COCAS',
  Cocad = 'COCAD'
}

export type Vendor = {
   __typename?: 'Vendor';
  id: Scalars['ID'];
  name: Scalars['String'];
  gstNumber: Scalars['String'];
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  ifsc: Scalars['String'];
  bankDetails: Scalars['String'];
  invoices: Array<Invoice>;
};

export type VerifyUserInput = {
  email: Scalars['String'];
  otp: Scalars['String'];
};

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  departmentId: Scalars['String'];
  rollNumber: Scalars['String'];
  mobile: Scalars['String'];
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'rollNumber' | 'mobile' | 'role' | 'profilePic' | 'coverPic' | 'about' | 'verified'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name'>
    ) }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
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

export type UploadCoverPicMutationVariables = {
  coverPic: Scalars['String'];
};


export type UploadCoverPicMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadCoverPic'>
);

export type UploadProfilePicMutationVariables = {
  profilePic: Scalars['String'];
};


export type UploadProfilePicMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadProfilePic'>
);

export type VerifyUserMutationVariables = {
  email: Scalars['String'];
  otp: Scalars['String'];
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
    & Pick<Department, 'id' | 'name' | 'shortName' | 'subDepartments'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'rollNumber' | 'mobile' | 'role' | 'profilePic' | 'coverPic' | 'about' | 'verified'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name'>
    ) }
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!, $departmentId: String!, $rollNumber: String!, $mobile: String!) {
  createUser(data: {name: $name, email: $email, password: $password, rollNumber: $rollNumber, mobile: $mobile, departmentId: $departmentId}) {
    id
    name
    email
    rollNumber
    mobile
    role
    profilePic
    coverPic
    about
    verified
    department {
      id
      name
    }
  }
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
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
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
 *      email: // value for 'email'
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
export const UploadCoverPicDocument = gql`
    mutation UploadCoverPic($coverPic: String!) {
  uploadCoverPic(coverPic: $coverPic)
}
    `;
export type UploadCoverPicMutationFn = ApolloReactCommon.MutationFunction<UploadCoverPicMutation, UploadCoverPicMutationVariables>;

/**
 * __useUploadCoverPicMutation__
 *
 * To run a mutation, you first call `useUploadCoverPicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCoverPicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCoverPicMutation, { data, loading, error }] = useUploadCoverPicMutation({
 *   variables: {
 *      coverPic: // value for 'coverPic'
 *   },
 * });
 */
export function useUploadCoverPicMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadCoverPicMutation, UploadCoverPicMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadCoverPicMutation, UploadCoverPicMutationVariables>(UploadCoverPicDocument, baseOptions);
      }
export type UploadCoverPicMutationHookResult = ReturnType<typeof useUploadCoverPicMutation>;
export type UploadCoverPicMutationResult = ApolloReactCommon.MutationResult<UploadCoverPicMutation>;
export type UploadCoverPicMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadCoverPicMutation, UploadCoverPicMutationVariables>;
export const UploadProfilePicDocument = gql`
    mutation UploadProfilePic($profilePic: String!) {
  uploadProfilePic(profilePic: $profilePic)
}
    `;
export type UploadProfilePicMutationFn = ApolloReactCommon.MutationFunction<UploadProfilePicMutation, UploadProfilePicMutationVariables>;

/**
 * __useUploadProfilePicMutation__
 *
 * To run a mutation, you first call `useUploadProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfilePicMutation, { data, loading, error }] = useUploadProfilePicMutation({
 *   variables: {
 *      profilePic: // value for 'profilePic'
 *   },
 * });
 */
export function useUploadProfilePicMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadProfilePicMutation, UploadProfilePicMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadProfilePicMutation, UploadProfilePicMutationVariables>(UploadProfilePicDocument, baseOptions);
      }
export type UploadProfilePicMutationHookResult = ReturnType<typeof useUploadProfilePicMutation>;
export type UploadProfilePicMutationResult = ApolloReactCommon.MutationResult<UploadProfilePicMutation>;
export type UploadProfilePicMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadProfilePicMutation, UploadProfilePicMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($email: String!, $otp: String!) {
  verifyUser(data: {email: $email, otp: $otp})
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
 *      email: // value for 'email'
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
    shortName
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
export function refetchGetDepartmentsQuery(variables?: GetDepartmentsQueryVariables) {
      return { query: GetDepartmentsDocument, variables: variables }
    }
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    rollNumber
    mobile
    role
    profilePic
    coverPic
    about
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
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }