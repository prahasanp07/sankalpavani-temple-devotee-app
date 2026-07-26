# Sankalpavani Devotee App Project Rules

### Devotee Details Schemas
- Do not add input fields for Age or Gender in the Devotee details form (`DevoteeFormScreen.jsx`).
- The primary devotee's Age and Gender must be sourced directly from the user's registration/session context (`currentUser`) and passed in the booking payload.
- Family members should only collect Name, Gotram, and Nakshatram; do not collect or validate Age or Gender for family members.
