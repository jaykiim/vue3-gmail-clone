<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>

    <span class="buttons">
      <button
        @click="emailSelection.markRead()"
        :disabled="[...emailSelection.emails].every((e) => e.read)"
      >
        Mark Read
      </button>
      <button
        @click="emailSelection.markUnread()"
        :disabled="[...emailSelection.emails].every((e) => !e.read)"
      >
        Mark Unead
      </button>
      <button @click="emailSelection.archive()" :disabled="numberSelected === 0">Archive</button>
    </span>
  </div>
</template>

<script>
import useEmailSelection from "@/composables/use-email-selection.js";
import { computed } from "vue";

export default {
  setup(props) {
    const emailSelection = useEmailSelection();
    const numberSelected = computed(() => emailSelection.emails.size);
    const numberEmails = props.emails.length;

    const allEmailsSelected = computed(
      () => numberSelected.value && numberSelected.value === numberEmails
    );
    const someEmailsSelected = computed(
      () => numberSelected.value > 0 && numberSelected.value < numberEmails
    );

    const bulkSelect = () => {
      if (allEmailsSelected.value) emailSelection.clear();
      else emailSelection.addMultiple(props.emails);
    };

    return {
      emailSelection,
      allEmailsSelected,
      someEmailsSelected,
      bulkSelect,
      numberSelected,
    };
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
