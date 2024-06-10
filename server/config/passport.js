import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GithubStrategy } from 'passport-github';
import { ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';

import keys from './keys.js';
import { EMAIL_PROVIDER } from '../constants/index.js';

const { google, facebook, github } = keys;

const { secret } = keys.jwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
    new JwtStrategy(opts, (payload, done) => {
        User.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            });
    })
);

export default async app => {
    app.use(passport.initialize());
    await googleAuth();
    await facebookAuth();
    await githubAuth();
};

const googleAuth = async () => {
    try {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: google.clientID,
                    clientSecret: google.clientSecret,
                    callbackURL: google.callbackURL
                },
                async (accessToken, refreshToken, profile, done) => {
                    User.findOne({ googleId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }
                            // const objectid = mongoose.Types.ObjectId(profile.id)
                            const name = profile.displayName.split(' ');
                            const newUser = new User({
                                googleId: profile.id,
                                username: `${name[0]} ${name[1]}`,
                                email: profile.email,
                                phoneNumber: profile.phoneNumber,
                                fullname: `${name[0]} ${name[1]}`,
                                provider: EMAIL_PROVIDER.Google,
                                photoimage: profile.picture,
                                phoneNumber: null,
                                password: null,
                                address: null,
                                gender: null,
                                __v: 1
                            });
                            newUser.__v = 1
                            newUser.save()
                            // newUser.save((err, user) => {
                            //     if (err) {
                            //         return done(err, false);
                            //     }

                            //     return done(null, user);
                            // });
                            return done(null, newUser);

                        })
                        .catch(err => {
                            return done(err, false);
                        });
                }
            )
        );

    } catch (error) {
        console.log('Missing google keys');
    }
};

const facebookAuth = async () => {
    try {
        passport.use(
            new FacebookStrategy(
                {
                    clientID: facebook.clientID,
                    clientSecret: facebook.clientSecret,
                    callbackURL: facebook.callbackURL,
                    profileFields: [
                        'id',
                        'displayName',
                        'name',
                        'emails',
                        'picture.type(large)'
                    ]
                },
                (accessToken, refreshToken, profile, done) => {
                    User.findOne({ facebookId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }
                            // const objectid = mongoose.Types.ObjectId(profile.id)
                            const newUser = new User({
                                facebookId: profile.id,
                                username: `${profile.name.givenName}${profile.name.familyName}`,
                                email: profile.emails ? profile.emails[0].value : null,
                                fullname: `${profile.name.givenName}${profile.name.familyName}`,
                                provider: EMAIL_PROVIDER.Facebook,
                                photoimage: profile.photos[0].value,
                                phoneNumber: null,
                                password: null,
                                address: null,
                                gender: null,
                                __v: 1
                            });
                            newUser.__v = 1
                            newUser.save()
                            // console.log(newUser);
                            // newUser.save((err, user) => {
                            //     if (err) {
                            //         return done(err, false);
                            //     }

                            //     return done(null, user);
                            // });
                            return done(null, newUser);
                        })
                        .catch(err => {
                            return done(err, false);
                        });
                }
            )
        );
    } catch (error) {
        console.log('Missing facebook keys');
    }
};

const githubAuth = async () => {
    try {
        passport.use(
            new GithubStrategy(
                {
                    clientID: github.clientID,
                    clientSecret: github.clientSecret,
                    callbackURL: github.callbackURL
                },
                (accessToken, refreshToken, profile, done) => {
                    User.findOne({ githubId: profile.id })
                        .then(user => {
                            if (user) {
                                return done(null, user);
                            }
                            console.log(profile);
                            // const objectid = mongoose.Types.ObjectId(profile.id)
                            const newUser = new User({
                                githubId: profile.id,
                                username: profile.username,
                                email: profile.profileUrl,
                                fullname: profile.displayName,
                                provider: EMAIL_PROVIDER.Github,
                                photoimage: profile.photos[0].value,
                                phoneNumber: null,
                                password: null,
                                address: null,
                                gender: null,
                                __v: 1
                            });
                            newUser.__v = 1
                            newUser.save()
                            // console.log(newUser);
                            // newUser.save((err, user) => {
                            //     if (err) {
                            //         return done(err, false);
                            //     }

                            //     return done(null, user);
                            // });
                            return done(null, newUser);
                        })
                        .catch(err => {
                            return done(err, false);
                        });
                }
            )
        );
    } catch (error) {
        console.log('Missing github keys');
    }
};
