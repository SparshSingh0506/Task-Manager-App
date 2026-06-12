import type { User } from "../db/types.schema.js"

export const register = ({username, password_hash} : Pick<User, "username" | "password_hash"> ) => {

}