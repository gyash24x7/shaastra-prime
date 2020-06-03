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

export type AddUsersToChannelInput = {
  channelId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type ApproveInvoiceInput = {
  currentStage: Scalars['String'];
  invoiceId: Scalars['String'];
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
  passwordOTP: Scalars['String'];
};

export type GetMessagesInput = {
  channelId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};

export type Goal = {
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

export type Invoice = {
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
  addUserToChannel: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
  deleteChannel: Scalars['Boolean'];
  updateChannel: Scalars['Boolean'];
  addSubDepartment: Scalars['Boolean'];
  createDepartment: Department;
  createUser: Array<Scalars['String']>;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<Array<Scalars['String']>>;
  sendPasswordOTP: Scalars['Boolean'];
  uploadCoverPic: Scalars['Boolean'];
  uploadProfilePic: Scalars['Boolean'];
  verifyUser?: Maybe<Scalars['String']>;
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
  otp: Scalars['String'];
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

export type Query = {
  getChannelDetails: Channel;
  getChannels: Array<Channel>;
  getUsers: Array<User>;
  getUser: User;
  me?: Maybe<User>;
  searchUser: Array<User>;
  getDepartments: Array<Department>;
  getDeptMembers: Array<User>;
  getGoals: Array<Goal>;
  getInvoices: Array<Invoice>;
  getMessages: Array<Message>;
  getTasks: Array<Task>;
  getTask: Task;
  getUpdates: Array<Update>;
};


export type QueryGetChannelDetailsArgs = {
  channelId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};


export type QuerySearchUserArgs = {
  searchStr: Scalars['String'];
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
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['String'];
};

export type Task = {
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
  id: Scalars['ID'];
  name: Scalars['String'];
  gstNumber: Scalars['String'];
  accountName: Scalars['String'];
  accountNumber: Scalars['String'];
  ifsc: Scalars['String'];
  bankDetails: Scalars['String'];
  invoices: Array<Invoice>;
};

export type AcceptTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type AcceptTaskMutation = { acceptTask: boolean };

export type AssignTaskMutationVariables = {
  taskId: Scalars['String'];
  assignedTo: Array<Scalars['String']>;
};


export type AssignTaskMutation = { assignTask: boolean };

export type CompleteTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type CompleteTaskMutation = { completeTask: boolean };

export type CreateChannelMutationVariables = {
  name: Scalars['String'];
  description: Scalars['String'];
  members: Array<Scalars['String']>;
};


export type CreateChannelMutation = { createChannel: boolean };

export type CreateMessageMutationVariables = {
  channelId: Scalars['String'];
  content: Scalars['String'];
  media: Array<Scalars['String']>;
  mediaType?: Maybe<Scalars['String']>;
};


export type CreateMessageMutation = { createMessage: boolean };

export type CreateTaskMutationVariables = {
  brief: Scalars['String'];
  details: Scalars['String'];
  forDeptId: Scalars['String'];
  deadline: Scalars['String'];
  channelIds: Array<Scalars['String']>;
};


export type CreateTaskMutation = { createTask: boolean };

export type CreateUpdateMutationVariables = {
  brief: Scalars['String'];
  subject: Scalars['String'];
  content: Scalars['String'];
};


export type CreateUpdateMutation = { createUpdate: boolean };

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  departmentId: Scalars['String'];
  rollNumber: Scalars['String'];
  mobile: Scalars['String'];
};


export type CreateUserMutation = { createUser: Array<string> };

export type DeleteTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type DeleteTaskMutation = { deleteTask: boolean };

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = { login?: Maybe<Array<string>> };

export type SubmitTaskMutationVariables = {
  taskId: Scalars['String'];
};


export type SubmitTaskMutation = { submitTask: boolean };

export type UploadCoverPicMutationVariables = {
  coverPic: Scalars['String'];
};


export type UploadCoverPicMutation = { uploadCoverPic: boolean };

export type UploadProfilePicMutationVariables = {
  profilePic: Scalars['String'];
};


export type UploadProfilePicMutation = { uploadProfilePic: boolean };

export type VerifyUserMutationVariables = {
  otp: Scalars['String'];
};


export type VerifyUserMutation = { verifyUser?: Maybe<string> };

export type GetChannelDetailsQueryVariables = {
  channelId: Scalars['String'];
};


export type GetChannelDetailsQuery = { getChannelDetails: { id: string, name: string, description: string, createdBy: { id: string, name: string }, members: Array<{ id: string, name: string, role: UserRole, department: { id: string, name: string } }>, connectedTasks: Array<{ id: string, brief: string, status: TaskStatus }>, starredMsgs: Array<{ id: string, content: string, type: MessageType, starred: boolean, createdAt: string, likes: number, createdBy: { id: string, name: string } }> } };

export type GetChannelsQueryVariables = {};


export type GetChannelsQuery = { getChannels: Array<{ id: string, name: string }> };

export type GetDepartmentsQueryVariables = {};


export type GetDepartmentsQuery = { getDepartments: Array<{ id: string, name: string, shortName: string, subDepartments: Array<string> }> };

export type GetDeptmembersQueryVariables = {
  deptId: Scalars['String'];
};


export type GetDeptmembersQuery = { getDeptMembers: Array<{ id: string, name: string, role: UserRole, profilePic: string, department: { name: string } }> };

export type GetMessagesQueryVariables = {
  channelId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};


export type GetMessagesQuery = { getMessages: Array<{ id: string, content: string, type: MessageType, starred: boolean, createdAt: string, likes: number, liked: boolean, createdBy: { id: string, name: string }, media: Array<{ id: string, url: string, type: MediaType }> }> };

export type GetTaskQueryVariables = {
  taskId: Scalars['String'];
};


export type GetTaskQuery = { getTask: { id: string, brief: string, details: string, status: TaskStatus, createdAt: string, deadline: string, byDept: { id: string, name: string }, createdBy: { id: string, name: string, role: UserRole, department: { id: string, name: string } }, assignedTo: Array<{ id: string, name: string, role: UserRole, department: { id: string, name: string } }> } };

export type GetTasksQueryVariables = {};


export type GetTasksQuery = { getTasks: Array<{ id: string, brief: string, status: TaskStatus, createdAt: string, deadline: string, byDept: { id: string, name: string }, assignedTo: Array<{ id: string, name: string }> }> };

export type GetUpdatesQueryVariables = {};


export type GetUpdatesQuery = { getUpdates: Array<{ id: string, brief: string, subject: string, content: string, createdAt: string, postedBy: { id: string, name: string }, byDept: { id: string, name: string } }> };

export type GetUserQueryVariables = {
  userId: Scalars['String'];
};


export type GetUserQuery = { getUser: { id: string, name: string, email: string, coverPic: string, profilePic: string, role: UserRole, mobile: string, upi: string, rollNumber: string, department: { name: string } } };

export type MeQueryVariables = {};


export type MeQuery = { me?: Maybe<{ id: string, name: string, email: string, rollNumber: string, mobile: string, role: UserRole, profilePic: string, coverPic: string, about: string, verified: boolean, department: { id: string, name: string } }> };

export type SearchUserQueryVariables = {
  searchStr: Scalars['String'];
};


export type SearchUserQuery = { searchUser: Array<{ id: string, name: string }> };

export type NewMessageSubscriptionVariables = {
  channelId: Scalars['String'];
};


export type NewMessageSubscription = { newMessage: { id: string, content: string, type: MessageType, starred: boolean, liked: boolean, createdAt: string, likes: number, createdBy: { id: string, name: string }, media: Array<{ id: string, url: string, type: MediaType }> } };


export const AcceptTaskDocument = gql`
    mutation AcceptTask($taskId: String!) {
  acceptTask(taskId: $taskId)
}
    `;
export type AcceptTaskMutationFn = ApolloReactCommon.MutationFunction<AcceptTaskMutation, AcceptTaskMutationVariables>;
export function useAcceptTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptTaskMutation, AcceptTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<AcceptTaskMutation, AcceptTaskMutationVariables>(AcceptTaskDocument, baseOptions);
      }
export type AcceptTaskMutationHookResult = ReturnType<typeof useAcceptTaskMutation>;
export type AcceptTaskMutationResult = ApolloReactCommon.MutationResult<AcceptTaskMutation>;
export type AcceptTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptTaskMutation, AcceptTaskMutationVariables>;
export const AssignTaskDocument = gql`
    mutation AssignTask($taskId: String!, $assignedTo: [String!]!) {
  assignTask(data: {taskId: $taskId, assignedTo: $assignedTo})
}
    `;
export type AssignTaskMutationFn = ApolloReactCommon.MutationFunction<AssignTaskMutation, AssignTaskMutationVariables>;
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
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: String!) {
  deleteTask(taskId: $taskId)
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;
export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password})
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
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
export function useUploadProfilePicMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadProfilePicMutation, UploadProfilePicMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadProfilePicMutation, UploadProfilePicMutationVariables>(UploadProfilePicDocument, baseOptions);
      }
export type UploadProfilePicMutationHookResult = ReturnType<typeof useUploadProfilePicMutation>;
export type UploadProfilePicMutationResult = ApolloReactCommon.MutationResult<UploadProfilePicMutation>;
export type UploadProfilePicMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadProfilePicMutation, UploadProfilePicMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($otp: String!) {
  verifyUser(otp: $otp)
}
    `;
export type VerifyUserMutationFn = ApolloReactCommon.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;
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
    }
  }
}
    `;
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
export function useNewMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewMessageSubscription>;