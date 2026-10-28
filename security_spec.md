# Security Specification & Test Payloads

## Data Invariants
1. A user can only read, create, update, and delete their own island profile, journal entries, villagers, story milestones, goals, and daily missions.
2. The `userId` of any document must strictly equal `request.auth.uid`.
3. String sizes and array lengths must adhere to boundaries to prevent denial of wallet attacks.
4. Anonymous users cannot tamper with other users' data.

## The "Dirty Dozen" Threat Payloads
1. **Payload 1 (Identity Theft)**: An attacker submits an `IslandProfile` with `userId: "victim123"` while authenticated as `attacker999`. Rule must reject with `PERMISSION_DENIED`.
2. **Payload 2 (Unauthenticated Write)**: An unauthenticated client attempts to add a `journal_entries` document. Must be rejected.
3. **Payload 3 (Oversized Payload)**: An attacker attempts to write a journal entry with a notes field > 50,000 characters. Must be rejected.
4. **Payload 4 (Ghost Role/Field Injection)**: Attempt to inject `isAdmin: true` into `island_profiles`. Must be rejected or ignored.
5. **Payload 5 (Cross-user read)**: User B attempts to read User A's private journal entry via direct document fetch. Must be rejected.
6. **Payload 6 (Cross-user query scraping)**: User B queries `/journal_entries` without filtering by their own `userId`. Must be rejected.
7. **Payload 7 (Path Injection Attack)**: Document ID containing forbidden characters like `../../hack` or oversized ID > 128 characters. Must be rejected by `isValidId`.
8. **Payload 8 (Negative EXP injection)**: Profile update attempting to assign negative numbers or non-number types to `experience`. Must be rejected.
9. **Payload 9 (Cross-user Villager Mutation)**: User B attempts to delete or update User A's `villagers/{villagerId}`. Must be rejected.
10. **Payload 10 (Story Shortcut via Cross-user)**: Attacker attempts to modify another user's story milestone to unlock Totakeke. Must be rejected.
11. **Payload 11 (Oversized Icon Array)**: Attacker passes an array of 5,000 items in `unlockedIconIds`. Must be rejected.
12. **Payload 12 (Daily Mission Spoofing)**: Attacker sets `claimed: true` on another user's daily mission. Must be rejected.
