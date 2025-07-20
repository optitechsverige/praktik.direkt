import { Contacthandlers } from '@/api/contacts/ContactsData';
import { Chathandlers } from '@/api/chat/Chatdata';
import { Ecommercehandlers } from '@/api/eCommerce/ProductsData';
import { PostHandlers } from '@/api/userprofile/PostData';
import { UserDataHandlers } from '@/api/userprofile/UsersData';
import { Bloghandlers } from '@/api/blog/blogData';
import { NotesHandlers } from '@/api/notes/NotesData';
import { TicketHandlers } from '@/api/ticket/TicketData';
import { Emailhandlers } from '@/api/email/EmailData';
import { InvoiceHandlers } from '@/api/invoice/invoceLists';
import { Kanbanhandlers } from '@/api/kanban/KanbanData';

export const mockHandlers = [
  ...Contacthandlers,
  ...Chathandlers,
  ...Ecommercehandlers,
  ...UserDataHandlers,
  ...PostHandlers,
  ...Bloghandlers,
  ...NotesHandlers,
  ...TicketHandlers,
  ...Emailhandlers,
  ...InvoiceHandlers,
  ...Kanbanhandlers,
];
