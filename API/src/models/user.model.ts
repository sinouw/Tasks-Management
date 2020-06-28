import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export const UserSchema = new mongoose.Schema({
    username: { type: String, unique : true , required : true},
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    password: String,
    phone: { type: String, default: "" },
    email: { type: String, unique : true , required : true },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    description: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    status: { type: Boolean, default: false },
    roles   : [String]
}, { timestamps: true });

export interface  User extends mongoose.Document {
    readonly _id  : string;
    readonly username: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly password: string;
    readonly phone: string,
    readonly email: string,
    readonly address: string,
    readonly city: string,
    readonly country: string,
    readonly postalCode: string,
    readonly description: string,
    readonly avatarUrl: string;
    readonly status: boolean;
    readonly roles   : string[]; 
}

export class  CreateUserDto {
    readonly username: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly roles   : string[]; 
}

UserSchema.pre('save', function (next) {
    let user = this as any;
    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) return next();
    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.checkPassword = function (attempt, callback) {
    let user = this;
    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

export const defaultUserDoc = {
    "username": "admin",
    "firstname": "admin",
    "lastname": "admin",
    "phone": "1122334455",
    "email": "admin@gmail.com",
    "status": true,
    "roles": ["admin"],
    "password": "admin",
  }