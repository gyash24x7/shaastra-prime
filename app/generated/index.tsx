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

export type AddUsersToChannelInput = {
  channelId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type ApproveInvoiceInput = {
  currentStage: Scalars['String'];
  invoiceId: Scalars['String'];
};

export type AssignFinManagerInput = {
  userId: Scalars['String'];
  deptId: Scalars['String'];
};

export type AssignTaskInput = {
  taskId: Scalars['String'];
  assignedTo: Array<Scalars['String']>;
};

export type AttachMediaToInvoiceInput = {
  invoiceId: Scalars['String'];
  mediaId?: Maybe<Scalars['String']>;
  newUrl: Scalars['String'];
  mediaType: Scalars['String'];
};

export type AttachMediaToTaskInput = {
  taskId: Scalars['String'];
  urls: Array<Scalars['String']>;
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
  connectedTasks: Array<Task>;
  starredMsgs: Array<Message>;
};

export enum ChannelType {
  Group = 'GROUP',
  Direct = 'DIRECT'
}

export type ConnectChannelsToInvoiceInput = {
  invoiceId: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};

export type ConnectChannelsToTaskInput = {
  taskId: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};

export type CreateChannelInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  members: Array<Scalars['String']>;
};

export type CreateGoalInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  type: GoalType;
  milestoneTitles: Array<Scalars['String']>;
};

export type CreateMessageInput = {
  channelId: Scalars['String'];
  content: Scalars['String'];
  media: Array<Scalars['String']>;
  mediaType?: Maybe<Scalars['String']>;
};

export type CreateTaskInput = {
  brief: Scalars['String'];
  details: Scalars['String'];
  forDeptId: Scalars['String'];
  deadline: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};

export type CreateUpdateInput = {
  brief: Scalars['String'];
  subject: Scalars['String'];
  content: Scalars['String'];
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
  goals: Array<Goal>;
  finManager: User;
};

export type EditInvoiceInput = {
  invoiceId: Scalars['String'];
  invoiceNumber: Scalars['String'];
  date: Scalars['String'];
  amount: Scalars['String'];
  purpose: Scalars['String'];
  type: InvoiceType;
  mediaType: MediaType;
  fileUrl: Scalars['String'];
  title: Scalars['String'];
  vendorId: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
};

export type GetMessagesInput = {
  channelId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};

export type Goal = {
  __typename?: 'Goal';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  dept: Department;
  type: GoalType;
  createdAt: Scalars['String'];
  milestones: Array<Milestone>;
};

export enum GoalType {
  Weekly = 'WEEKLY',
  BiWeekly = 'BI_WEEKLY',
  Monthly = 'MONTHLY',
  EndGoal = 'END_GOAL'
}

export type GrantAccessInput = {
  userId: Scalars['String'];
  role: UserRole;
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
  channels: Array<Channel>;
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
  liked: Scalars['Boolean'];
  taskActivity?: Maybe<TaskActivity>;
  invoiceActivity?: Maybe<InvoiceActivity>;
};

export enum MessageType {
  System = 'SYSTEM',
  Text = 'TEXT',
  Media = 'MEDIA',
  TaskActivity = 'TASK_ACTIVITY',
  InvoiceActivity = 'INVOICE_ACTIVITY'
}

export type Milestone = {
  __typename?: 'Milestone';
  id: Scalars['ID'];
  title: Scalars['String'];
  status: MilestoneStatus;
  goal: Goal;
};

export enum MilestoneStatus {
  InProgress = 'IN_PROGRESS',
  Achieved = 'ACHIEVED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addUserToChannel: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
  deleteChannel: Scalars['Boolean'];
  updateChannel: Scalars['Boolean'];
  addSubDepartment: Scalars['Boolean'];
  assignFinManager: Scalars['Boolean'];
  createDepartment: Department;
  deleteMember: Scalars['Boolean'];
  grantAccess: Scalars['Boolean'];
  completeMilestone: Scalars['Boolean'];
  createGoal: Scalars['Boolean'];
  approveInvoice: Scalars['Boolean'];
  attachMediaToInvoice: Scalars['Boolean'];
  connectChannelsToInvoice: Scalars['Boolean'];
  deleteInvoice: Scalars['Boolean'];
  editInvoice: Scalars['Boolean'];
  rejectInvoice: Scalars['Boolean'];
  submitInvoice: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  updateMessage: Scalars['Boolean'];
  acceptTask: Scalars['Boolean'];
  assignTask: Scalars['Boolean'];
  attachMediaToTask: Scalars['Boolean'];
  completeTask: Scalars['Boolean'];
  connectChannelsToTask: Scalars['Boolean'];
  createTask: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  submitTask: Scalars['Boolean'];
  createUpdate: Scalars['Boolean'];
  createUser: Array<Scalars['String']>;
  forgotPassword: Scalars['Boolean'];
  getPasswordOTP: Scalars['Boolean'];
  login?: Maybe<Array<Scalars['String']>>;
  uploadCoverPic: Scalars['Boolean'];
  uploadProfilePic: Scalars['Boolean'];
  verifyPasswordOTP: Scalars['Boolean'];
  verifyUser?: Maybe<Scalars['String']>;
};


export type MutationAddUserToChannelArgs = {
  data: AddUsersToChannelInput;
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


export type MutationAddSubDepartmentArgs = {
  subDept: Scalars['String'];
};


export type MutationAssignFinManagerArgs = {
  data: AssignFinManagerInput;
};


export type MutationCreateDepartmentArgs = {
  name: Scalars['String'];
};


export type MutationDeleteMemberArgs = {
  userId: Scalars['String'];
};


export type MutationGrantAccessArgs = {
  data: GrantAccessInput;
};


export type MutationCompleteMilestoneArgs = {
  milestoneId: Scalars['String'];
};


export type MutationCreateGoalArgs = {
  data: CreateGoalInput;
};


export type MutationApproveInvoiceArgs = {
  data: ApproveInvoiceInput;
};


export type MutationAttachMediaToInvoiceArgs = {
  data: AttachMediaToInvoiceInput;
};


export type MutationConnectChannelsToInvoiceArgs = {
  data: ConnectChannelsToInvoiceInput;
};


export type MutationDeleteInvoiceArgs = {
  invoiceId: Scalars['String'];
};


export type MutationEditInvoiceArgs = {
  data: EditInvoiceInput;
};


export type MutationRejectInvoiceArgs = {
  data: RejectInvoiceInput;
};


export type MutationSubmitInvoiceArgs = {
  data: SubmitInvoiceInput;
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationUpdateMessageArgs = {
  data: UpdateMessageInput;
};


export type MutationAcceptTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationAssignTaskArgs = {
  data: AssignTaskInput;
};


export type MutationAttachMediaToTaskArgs = {
  data: AttachMediaToTaskInput;
};


export type MutationCompleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationConnectChannelsToTaskArgs = {
  data: ConnectChannelsToTaskInput;
};


export type MutationCreateTaskArgs = {
  data: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationSubmitTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationCreateUpdateArgs = {
  data: CreateUpdateInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};


export type MutationGetPasswordOtpArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUploadCoverPicArgs = {
  coverPic: Scalars['String'];
};


export type MutationUploadProfilePicArgs = {
  profilePic: Scalars['String'];
};


export type MutationVerifyPasswordOtpArgs = {
  data: VerifyPasswordOtpInput;
};


export type MutationVerifyUserArgs = {
  otp: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getChannelDetails: Channel;
  getChannels: Array<Channel>;
  getDepartments: Array<Department>;
  getDeptMembers: Array<User>;
  getGoals: Array<Goal>;
  getInvoices: Array<Invoice>;
  getMessages: Array<Message>;
  getTasks: Array<Task>;
  getTask: Task;
  getUpdates: Array<Update>;
  getUsers: Array<User>;
  getUser: User;
  me?: Maybe<User>;
  searchUser: Array<User>;
};


export type QueryGetChannelDetailsArgs = {
  channelId: Scalars['String'];
};


export type QueryGetDeptMembersArgs = {
  deptId: Scalars['String'];
};


export type QueryGetInvoicesArgs = {
  type: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  data: GetMessagesInput;
};


export type QueryGetTaskArgs = {
  taskId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};


export type QuerySearchUserArgs = {
  searchStr: Scalars['String'];
};

export type RejectInvoiceInput = {
  invoiceId: Scalars['String'];
  reason: Scalars['String'];
};

export type SubmitInvoiceInput = {
  invoiceNumber: Scalars['String'];
  date: Scalars['String'];
  amount: Scalars['String'];
  purpose: Scalars['String'];
  type: InvoiceType;
  mediaType: MediaType;
  fileUrl: Scalars['String'];
  title: Scalars['String'];
  vendorId: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['String'];
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
  channels: Array<Channel>;
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
  Completed = 'COMPLETED',
  ConnectChannel = 'CONNECT_CHANNEL',
  AttachMedia = 'ATTACH_MEDIA',
  Deleted = 'DELETED'
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

export type VerifyPasswordOtpInput = {
  email: Scalars['String'];
  passwordOTP: Scalars['String'];
};

export type AcceptTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type AcceptTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptTask'>
);

export type AddSubDeptMutationVariables = {
  subDept: Scalars['String'];
};


export type AddSubDeptMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSubDepartment'>
);

export type AssignFinManagerMutationVariables = {
  userId: Scalars['String'];
  deptId: Scalars['String'];
};


export type AssignFinManagerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignFinManager'>
);

export type AssignTaskMutationVariables = {
  taskId: Scalars['String'];
  assignedTo: Array<Scalars['String']>;
};


export type AssignTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignTask'>
);

export type CompleteTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type CompleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'completeTask'>
);

export type CreateChannelMutationVariables = {
  name: Scalars['String'];
  description: Scalars['String'];
  members: Array<Scalars['String']>;
};


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChannel'>
);

export type CreateMessageMutationVariables = {
  channelId: Scalars['String'];
  content: Scalars['String'];
  media: Array<Scalars['String']>;
  mediaType?: Maybe<Scalars['String']>;
};


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMessage'>
);

export type CreateTaskMutationVariables = {
  brief: Scalars['String'];
  details: Scalars['String'];
  forDeptId: Scalars['String'];
  deadline: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTask'>
);

export type CreateUpdateMutationVariables = {
  brief: Scalars['String'];
  subject: Scalars['String'];
  content: Scalars['String'];
};


export type CreateUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUpdate'>
);

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
  & Pick<Mutation, 'createUser'>
);

export type DeleteMemberMutationVariables = {
  userId: Scalars['String'];
};


export type DeleteMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMember'>
);

export type DeleteTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GetPasswordOtpMutationVariables = {
  email: Scalars['String'];
};


export type GetPasswordOtpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'getPasswordOTP'>
);

export type GrantAccessMutationVariables = {
  userId: Scalars['String'];
  role: UserRole;
};


export type GrantAccessMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'grantAccess'>
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type SubmitTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type SubmitTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'submitTask'>
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

export type VerifyPasswordOtpMutationVariables = {
  email: Scalars['String'];
  passwordOTP: Scalars['String'];
};


export type VerifyPasswordOtpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyPasswordOTP'>
);

export type VerifyUserMutationVariables = {
  otp: Scalars['String'];
};


export type VerifyUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyUser'>
);

export type GetChannelDetailsQueryVariables = {
  channelId: Scalars['String'];
};


export type GetChannelDetailsQuery = (
  { __typename?: 'Query' }
  & { getChannelDetails: (
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'description'>
    & { createdBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'role'>
      & { department: (
        { __typename?: 'Department' }
        & Pick<Department, 'id' | 'name'>
      ) }
    )>, connectedTasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'brief' | 'status'>
    )>, starredMsgs: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'content' | 'type' | 'starred' | 'createdAt' | 'likes'>
      & { createdBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type GetChannelsQueryVariables = {};


export type GetChannelsQuery = (
  { __typename?: 'Query' }
  & { getChannels: Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name'>
  )> }
);

export type GetDepartmentsQueryVariables = {};


export type GetDepartmentsQuery = (
  { __typename?: 'Query' }
  & { getDepartments: Array<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'name' | 'shortName' | 'subDepartments'>
  )> }
);

export type GetDeptmembersQueryVariables = {
  deptId: Scalars['String'];
};


export type GetDeptmembersQuery = (
  { __typename?: 'Query' }
  & { getDeptMembers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'role' | 'profilePic'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'name'>
    ) }
  )> }
);

export type GetMessagesQueryVariables = {
  channelId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'type' | 'starred' | 'createdAt' | 'likes' | 'liked'>
    & { createdBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), media: Array<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'url' | 'type'>
    )> }
  )> }
);

export type GetTaskQueryVariables = {
  taskId: Scalars['String'];
};


export type GetTaskQuery = (
  { __typename?: 'Query' }
  & { getTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'brief' | 'details' | 'status' | 'createdAt' | 'deadline'>
    & { byDept: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name'>
    ), createdBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'role'>
      & { department: (
        { __typename?: 'Department' }
        & Pick<Department, 'id' | 'name'>
      ) }
    ), assignedTo: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'role'>
      & { department: (
        { __typename?: 'Department' }
        & Pick<Department, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type GetTasksQueryVariables = {};


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { getTasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'brief' | 'status' | 'createdAt' | 'deadline'>
    & { byDept: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name'>
    ), assignedTo: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type GetUpdatesQueryVariables = {};


export type GetUpdatesQuery = (
  { __typename?: 'Query' }
  & { getUpdates: Array<(
    { __typename?: 'Update' }
    & Pick<Update, 'id' | 'brief' | 'subject' | 'content' | 'createdAt'>
    & { postedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), byDept: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name'>
    ) }
  )> }
);

export type GetUserQueryVariables = {
  userId: Scalars['String'];
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'coverPic' | 'profilePic' | 'role' | 'mobile' | 'upi' | 'rollNumber'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'name'>
    ) }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'rollNumber' | 'mobile' | 'role' | 'profilePic' | 'coverPic' | 'about' | 'verified'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name' | 'shortName' | 'subDepartments'>
    ) }
  )> }
);

export type SearchUserQueryVariables = {
  searchStr: Scalars['String'];
};


export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { searchUser: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type NewMessageSubscriptionVariables = {
  channelId: Scalars['String'];
};


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'type' | 'starred' | 'liked' | 'createdAt' | 'likes'>
    & { createdBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), media: Array<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'url' | 'type'>
    )> }
  ) }
);


export const AcceptTaskDocument = gql`
    mutation AcceptTask($taskId: String!) {
  acceptTask(taskId: $taskId)
}
    `;
export type AcceptTaskMutationFn = ApolloReactCommon.MutationFunction<AcceptTaskMutation, AcceptTaskMutationVariables>;

/**
 * __useAcceptTaskMutation__
 *
 * To run a mutation, you first call `useAcceptTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptTaskMutation, { data, loading, error }] = useAcceptTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useAcceptTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptTaskMutation, AcceptTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptTaskMutation, AcceptTaskMutationVariables>(AcceptTaskDocument, baseOptions);
      }
export type AcceptTaskMutationHookResult = ReturnType<typeof useAcceptTaskMutation>;
export type AcceptTaskMutationResult = ApolloReactCommon.MutationResult<AcceptTaskMutation>;
export type AcceptTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptTaskMutation, AcceptTaskMutationVariables>;
export const AddSubDeptDocument = gql`
    mutation AddSubDept($subDept: String!) {
  addSubDepartment(subDept: $subDept)
}
    `;
export type AddSubDeptMutationFn = ApolloReactCommon.MutationFunction<AddSubDeptMutation, AddSubDeptMutationVariables>;

/**
 * __useAddSubDeptMutation__
 *
 * To run a mutation, you first call `useAddSubDeptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubDeptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubDeptMutation, { data, loading, error }] = useAddSubDeptMutation({
 *   variables: {
 *      subDept: // value for 'subDept'
 *   },
 * });
 */
export function useAddSubDeptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddSubDeptMutation, AddSubDeptMutationVariables>) {
        return ApolloReactHooks.useMutation<AddSubDeptMutation, AddSubDeptMutationVariables>(AddSubDeptDocument, baseOptions);
      }
export type AddSubDeptMutationHookResult = ReturnType<typeof useAddSubDeptMutation>;
export type AddSubDeptMutationResult = ApolloReactCommon.MutationResult<AddSubDeptMutation>;
export type AddSubDeptMutationOptions = ApolloReactCommon.BaseMutationOptions<AddSubDeptMutation, AddSubDeptMutationVariables>;
export const AssignFinManagerDocument = gql`
    mutation AssignFinManager($userId: String!, $deptId: String!) {
  assignFinManager(data: {userId: $userId, deptId: $deptId})
}
    `;
export type AssignFinManagerMutationFn = ApolloReactCommon.MutationFunction<AssignFinManagerMutation, AssignFinManagerMutationVariables>;

/**
 * __useAssignFinManagerMutation__
 *
 * To run a mutation, you first call `useAssignFinManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignFinManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignFinManagerMutation, { data, loading, error }] = useAssignFinManagerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      deptId: // value for 'deptId'
 *   },
 * });
 */
export function useAssignFinManagerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignFinManagerMutation, AssignFinManagerMutationVariables>) {
        return ApolloReactHooks.useMutation<AssignFinManagerMutation, AssignFinManagerMutationVariables>(AssignFinManagerDocument, baseOptions);
      }
export type AssignFinManagerMutationHookResult = ReturnType<typeof useAssignFinManagerMutation>;
export type AssignFinManagerMutationResult = ApolloReactCommon.MutationResult<AssignFinManagerMutation>;
export type AssignFinManagerMutationOptions = ApolloReactCommon.BaseMutationOptions<AssignFinManagerMutation, AssignFinManagerMutationVariables>;
export const AssignTaskDocument = gql`
    mutation AssignTask($taskId: String!, $assignedTo: [String!]!) {
  assignTask(data: {taskId: $taskId, assignedTo: $assignedTo})
}
    `;
export type AssignTaskMutationFn = ApolloReactCommon.MutationFunction<AssignTaskMutation, AssignTaskMutationVariables>;

/**
 * __useAssignTaskMutation__
 *
 * To run a mutation, you first call `useAssignTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignTaskMutation, { data, loading, error }] = useAssignTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      assignedTo: // value for 'assignedTo'
 *   },
 * });
 */
export function useAssignTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignTaskMutation, AssignTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<AssignTaskMutation, AssignTaskMutationVariables>(AssignTaskDocument, baseOptions);
      }
export type AssignTaskMutationHookResult = ReturnType<typeof useAssignTaskMutation>;
export type AssignTaskMutationResult = ApolloReactCommon.MutationResult<AssignTaskMutation>;
export type AssignTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<AssignTaskMutation, AssignTaskMutationVariables>;
export const CompleteTaskDocument = gql`
    mutation CompleteTask($taskId: String!) {
  completeTask(taskId: $taskId)
}
    `;
export type CompleteTaskMutationFn = ApolloReactCommon.MutationFunction<CompleteTaskMutation, CompleteTaskMutationVariables>;

/**
 * __useCompleteTaskMutation__
 *
 * To run a mutation, you first call `useCompleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTaskMutation, { data, loading, error }] = useCompleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useCompleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CompleteTaskMutation, CompleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CompleteTaskMutation, CompleteTaskMutationVariables>(CompleteTaskDocument, baseOptions);
      }
export type CompleteTaskMutationHookResult = ReturnType<typeof useCompleteTaskMutation>;
export type CompleteTaskMutationResult = ApolloReactCommon.MutationResult<CompleteTaskMutation>;
export type CompleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CompleteTaskMutation, CompleteTaskMutationVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!, $description: String!, $members: [String!]!) {
  createChannel(data: {name: $name, description: $description, members: $members})
}
    `;
export type CreateChannelMutationFn = ApolloReactCommon.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = ApolloReactCommon.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($channelId: String!, $content: String!, $media: [String!]!, $mediaType: String) {
  createMessage(data: {channelId: $channelId, content: $content, media: $media, mediaType: $mediaType})
}
    `;
export type CreateMessageMutationFn = ApolloReactCommon.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      content: // value for 'content'
 *      media: // value for 'media'
 *      mediaType: // value for 'mediaType'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($brief: String!, $details: String!, $forDeptId: String!, $deadline: String!, $channelIds: [String!]!) {
  createTask(data: {brief: $brief, details: $details, forDeptId: $forDeptId, deadline: $deadline, channelIds: $channelIds})
}
    `;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      brief: // value for 'brief'
 *      details: // value for 'details'
 *      forDeptId: // value for 'forDeptId'
 *      deadline: // value for 'deadline'
 *      channelIds: // value for 'channelIds'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateUpdateDocument = gql`
    mutation CreateUpdate($brief: String!, $subject: String!, $content: String!) {
  createUpdate(data: {brief: $brief, subject: $subject, content: $content})
}
    `;
export type CreateUpdateMutationFn = ApolloReactCommon.MutationFunction<CreateUpdateMutation, CreateUpdateMutationVariables>;

/**
 * __useCreateUpdateMutation__
 *
 * To run a mutation, you first call `useCreateUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUpdateMutation, { data, loading, error }] = useCreateUpdateMutation({
 *   variables: {
 *      brief: // value for 'brief'
 *      subject: // value for 'subject'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUpdateMutation, CreateUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUpdateMutation, CreateUpdateMutationVariables>(CreateUpdateDocument, baseOptions);
      }
export type CreateUpdateMutationHookResult = ReturnType<typeof useCreateUpdateMutation>;
export type CreateUpdateMutationResult = ApolloReactCommon.MutationResult<CreateUpdateMutation>;
export type CreateUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUpdateMutation, CreateUpdateMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!, $departmentId: String!, $rollNumber: String!, $mobile: String!) {
  createUser(data: {name: $name, email: $email, password: $password, rollNumber: $rollNumber, mobile: $mobile, departmentId: $departmentId})
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
export const DeleteMemberDocument = gql`
    mutation DeleteMember($userId: String!) {
  deleteMember(userId: $userId)
}
    `;
export type DeleteMemberMutationFn = ApolloReactCommon.MutationFunction<DeleteMemberMutation, DeleteMemberMutationVariables>;

/**
 * __useDeleteMemberMutation__
 *
 * To run a mutation, you first call `useDeleteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemberMutation, { data, loading, error }] = useDeleteMemberMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMemberMutation, DeleteMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMemberMutation, DeleteMemberMutationVariables>(DeleteMemberDocument, baseOptions);
      }
export type DeleteMemberMutationHookResult = ReturnType<typeof useDeleteMemberMutation>;
export type DeleteMemberMutationResult = ApolloReactCommon.MutationResult<DeleteMemberMutation>;
export type DeleteMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: String!) {
  deleteTask(taskId: $taskId)
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!, $newPassword: String!) {
  forgotPassword(data: {email: $email, newPassword: $newPassword})
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetPasswordOtpDocument = gql`
    mutation GetPasswordOTP($email: String!) {
  getPasswordOTP(email: $email)
}
    `;
export type GetPasswordOtpMutationFn = ApolloReactCommon.MutationFunction<GetPasswordOtpMutation, GetPasswordOtpMutationVariables>;

/**
 * __useGetPasswordOtpMutation__
 *
 * To run a mutation, you first call `useGetPasswordOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPasswordOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPasswordOtpMutation, { data, loading, error }] = useGetPasswordOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetPasswordOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetPasswordOtpMutation, GetPasswordOtpMutationVariables>) {
        return ApolloReactHooks.useMutation<GetPasswordOtpMutation, GetPasswordOtpMutationVariables>(GetPasswordOtpDocument, baseOptions);
      }
export type GetPasswordOtpMutationHookResult = ReturnType<typeof useGetPasswordOtpMutation>;
export type GetPasswordOtpMutationResult = ApolloReactCommon.MutationResult<GetPasswordOtpMutation>;
export type GetPasswordOtpMutationOptions = ApolloReactCommon.BaseMutationOptions<GetPasswordOtpMutation, GetPasswordOtpMutationVariables>;
export const GrantAccessDocument = gql`
    mutation GrantAccess($userId: String!, $role: UserRole!) {
  grantAccess(data: {userId: $userId, role: $role})
}
    `;
export type GrantAccessMutationFn = ApolloReactCommon.MutationFunction<GrantAccessMutation, GrantAccessMutationVariables>;

/**
 * __useGrantAccessMutation__
 *
 * To run a mutation, you first call `useGrantAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrantAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grantAccessMutation, { data, loading, error }] = useGrantAccessMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useGrantAccessMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GrantAccessMutation, GrantAccessMutationVariables>) {
        return ApolloReactHooks.useMutation<GrantAccessMutation, GrantAccessMutationVariables>(GrantAccessDocument, baseOptions);
      }
export type GrantAccessMutationHookResult = ReturnType<typeof useGrantAccessMutation>;
export type GrantAccessMutationResult = ApolloReactCommon.MutationResult<GrantAccessMutation>;
export type GrantAccessMutationOptions = ApolloReactCommon.BaseMutationOptions<GrantAccessMutation, GrantAccessMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password})
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
export const SubmitTaskDocument = gql`
    mutation SubmitTask($taskId: String!) {
  submitTask(taskId: $taskId)
}
    `;
export type SubmitTaskMutationFn = ApolloReactCommon.MutationFunction<SubmitTaskMutation, SubmitTaskMutationVariables>;

/**
 * __useSubmitTaskMutation__
 *
 * To run a mutation, you first call `useSubmitTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTaskMutation, { data, loading, error }] = useSubmitTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useSubmitTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubmitTaskMutation, SubmitTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<SubmitTaskMutation, SubmitTaskMutationVariables>(SubmitTaskDocument, baseOptions);
      }
export type SubmitTaskMutationHookResult = ReturnType<typeof useSubmitTaskMutation>;
export type SubmitTaskMutationResult = ApolloReactCommon.MutationResult<SubmitTaskMutation>;
export type SubmitTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<SubmitTaskMutation, SubmitTaskMutationVariables>;
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
export const VerifyPasswordOtpDocument = gql`
    mutation VerifyPasswordOTP($email: String!, $passwordOTP: String!) {
  verifyPasswordOTP(data: {email: $email, passwordOTP: $passwordOTP})
}
    `;
export type VerifyPasswordOtpMutationFn = ApolloReactCommon.MutationFunction<VerifyPasswordOtpMutation, VerifyPasswordOtpMutationVariables>;

/**
 * __useVerifyPasswordOtpMutation__
 *
 * To run a mutation, you first call `useVerifyPasswordOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPasswordOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPasswordOtpMutation, { data, loading, error }] = useVerifyPasswordOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      passwordOTP: // value for 'passwordOTP'
 *   },
 * });
 */
export function useVerifyPasswordOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyPasswordOtpMutation, VerifyPasswordOtpMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyPasswordOtpMutation, VerifyPasswordOtpMutationVariables>(VerifyPasswordOtpDocument, baseOptions);
      }
export type VerifyPasswordOtpMutationHookResult = ReturnType<typeof useVerifyPasswordOtpMutation>;
export type VerifyPasswordOtpMutationResult = ApolloReactCommon.MutationResult<VerifyPasswordOtpMutation>;
export type VerifyPasswordOtpMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyPasswordOtpMutation, VerifyPasswordOtpMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($otp: String!) {
  verifyUser(otp: $otp)
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
export const GetChannelDetailsDocument = gql`
    query GetChannelDetails($channelId: String!) {
  getChannelDetails(channelId: $channelId) {
    id
    name
    description
    createdBy {
      id
      name
    }
    members {
      id
      name
      role
      department {
        id
        name
      }
    }
    connectedTasks {
      id
      brief
      status
    }
    starredMsgs {
      id
      content
      type
      starred
      createdBy {
        id
        name
      }
      createdAt
      likes
    }
  }
}
    `;

/**
 * __useGetChannelDetailsQuery__
 *
 * To run a query within a React component, call `useGetChannelDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelDetailsQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChannelDetailsQuery, GetChannelDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChannelDetailsQuery, GetChannelDetailsQueryVariables>(GetChannelDetailsDocument, baseOptions);
      }
export function useGetChannelDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChannelDetailsQuery, GetChannelDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChannelDetailsQuery, GetChannelDetailsQueryVariables>(GetChannelDetailsDocument, baseOptions);
        }
export type GetChannelDetailsQueryHookResult = ReturnType<typeof useGetChannelDetailsQuery>;
export type GetChannelDetailsLazyQueryHookResult = ReturnType<typeof useGetChannelDetailsLazyQuery>;
export type GetChannelDetailsQueryResult = ApolloReactCommon.QueryResult<GetChannelDetailsQuery, GetChannelDetailsQueryVariables>;
export function refetchGetChannelDetailsQuery(variables?: GetChannelDetailsQueryVariables) {
      return { query: GetChannelDetailsDocument, variables: variables }
    }
export const GetChannelsDocument = gql`
    query GetChannels {
  getChannels {
    id
    name
  }
}
    `;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
      }
export function useGetChannelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = ApolloReactCommon.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export function refetchGetChannelsQuery(variables?: GetChannelsQueryVariables) {
      return { query: GetChannelsDocument, variables: variables }
    }
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
export const GetDeptmembersDocument = gql`
    query GetDeptmembers($deptId: String!) {
  getDeptMembers(deptId: $deptId) {
    id
    name
    role
    profilePic
    department {
      name
    }
  }
}
    `;

/**
 * __useGetDeptmembersQuery__
 *
 * To run a query within a React component, call `useGetDeptmembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeptmembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeptmembersQuery({
 *   variables: {
 *      deptId: // value for 'deptId'
 *   },
 * });
 */
export function useGetDeptmembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDeptmembersQuery, GetDeptmembersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDeptmembersQuery, GetDeptmembersQueryVariables>(GetDeptmembersDocument, baseOptions);
      }
export function useGetDeptmembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDeptmembersQuery, GetDeptmembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDeptmembersQuery, GetDeptmembersQueryVariables>(GetDeptmembersDocument, baseOptions);
        }
export type GetDeptmembersQueryHookResult = ReturnType<typeof useGetDeptmembersQuery>;
export type GetDeptmembersLazyQueryHookResult = ReturnType<typeof useGetDeptmembersLazyQuery>;
export type GetDeptmembersQueryResult = ApolloReactCommon.QueryResult<GetDeptmembersQuery, GetDeptmembersQueryVariables>;
export function refetchGetDeptmembersQuery(variables?: GetDeptmembersQueryVariables) {
      return { query: GetDeptmembersDocument, variables: variables }
    }
export const GetMessagesDocument = gql`
    query GetMessages($channelId: String!, $skip: Int, $first: Int) {
  getMessages(data: {channelId: $channelId, skip: $skip, first: $first}) {
    id
    content
    type
    starred
    createdBy {
      id
      name
    }
    createdAt
    media {
      id
      url
      type
    }
    likes
    liked
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = ApolloReactCommon.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export function refetchGetMessagesQuery(variables?: GetMessagesQueryVariables) {
      return { query: GetMessagesDocument, variables: variables }
    }
export const GetTaskDocument = gql`
    query GetTask($taskId: String!) {
  getTask(taskId: $taskId) {
    id
    brief
    details
    status
    createdAt
    deadline
    byDept {
      id
      name
    }
    createdBy {
      id
      name
      role
      department {
        id
        name
      }
    }
    assignedTo {
      id
      name
      role
      department {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, baseOptions);
      }
export function useGetTaskLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, baseOptions);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = ApolloReactCommon.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export function refetchGetTaskQuery(variables?: GetTaskQueryVariables) {
      return { query: GetTaskDocument, variables: variables }
    }
export const GetTasksDocument = gql`
    query GetTasks {
  getTasks {
    id
    brief
    status
    createdAt
    deadline
    byDept {
      id
      name
    }
    assignedTo {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, baseOptions);
      }
export function useGetTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, baseOptions);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = ApolloReactCommon.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export function refetchGetTasksQuery(variables?: GetTasksQueryVariables) {
      return { query: GetTasksDocument, variables: variables }
    }
export const GetUpdatesDocument = gql`
    query GetUpdates {
  getUpdates {
    id
    brief
    subject
    content
    postedBy {
      id
      name
    }
    byDept {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetUpdatesQuery__
 *
 * To run a query within a React component, call `useGetUpdatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpdatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpdatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpdatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUpdatesQuery, GetUpdatesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUpdatesQuery, GetUpdatesQueryVariables>(GetUpdatesDocument, baseOptions);
      }
export function useGetUpdatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUpdatesQuery, GetUpdatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUpdatesQuery, GetUpdatesQueryVariables>(GetUpdatesDocument, baseOptions);
        }
export type GetUpdatesQueryHookResult = ReturnType<typeof useGetUpdatesQuery>;
export type GetUpdatesLazyQueryHookResult = ReturnType<typeof useGetUpdatesLazyQuery>;
export type GetUpdatesQueryResult = ApolloReactCommon.QueryResult<GetUpdatesQuery, GetUpdatesQueryVariables>;
export function refetchGetUpdatesQuery(variables?: GetUpdatesQueryVariables) {
      return { query: GetUpdatesDocument, variables: variables }
    }
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(userId: $userId) {
    id
    name
    email
    coverPic
    profilePic
    role
    department {
      name
    }
    mobile
    upi
    rollNumber
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export function refetchGetUserQuery(variables?: GetUserQueryVariables) {
      return { query: GetUserDocument, variables: variables }
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
      shortName
      subDepartments
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
export const SearchUserDocument = gql`
    query SearchUser($searchStr: String!) {
  searchUser(searchStr: $searchStr) {
    id
    name
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      searchStr: // value for 'searchStr'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
      }
export function useSearchUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = ApolloReactCommon.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export function refetchSearchUserQuery(variables?: SearchUserQueryVariables) {
      return { query: SearchUserDocument, variables: variables }
    }
export const NewMessageDocument = gql`
    subscription NewMessage($channelId: String!) {
  newMessage(channelId: $channelId) {
    id
    content
    type
    starred
    liked
    createdBy {
      id
      name
    }
    createdAt
    media {
      id
      url
      type
    }
    likes
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewMessageSubscription>;