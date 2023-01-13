import { reactive } from "vue";

const emails = reactive(new Set());
export const useEmailSelection = () => {
  const toggle = (email) => {
    if (emails.has(email)) emails.delete(email);
    else emails.add(email);
  };

  const clear = () => emails.clear();
  const addMultiple = (newEmails) => {
    newEmails.forEach((e) => emails.add(e));
  };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
  };
};

export default useEmailSelection;
