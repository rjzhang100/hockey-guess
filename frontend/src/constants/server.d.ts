import express from "express";
import mongoose from "mongoose";
declare const appRouter: import("@trpc/server").CreateRouterInner<
  import("@trpc/server").RootConfig<{
    ctx: import("./trpc/trpc").Context;
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
  }>,
  {
    user: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: import("./trpc/trpc").Context;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        insertUser: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: import("./trpc/trpc").Context;
            _input_in: {
              name: string;
              email: string;
              password: string;
            };
            _input_out: {
              name: string;
              email: string;
              password: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          mongoose.Document<unknown, {}, import("./models/User").IUser> &
            import("./models/User").IUser & {
              _id: mongoose.Types.ObjectId;
            } & {
              __v: number;
            }
        >;
        getUser: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: {
              userId: string;
            };
            _input_out: {
              userId: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          mongoose.Document<unknown, {}, import("./models/User").IUser> &
            import("./models/User").IUser & {
              _id: mongoose.Types.ObjectId;
            } & {
              __v: number;
            }
        >;
        getAllUsers: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            name: string;
            email: string;
            gamesRight: number;
            gamesWrong: number;
            percentRight: number;
          }[]
        >;
      }
    >;
    nhl: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: import("./trpc/trpc").Context;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        getGames: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: {
              date: Date;
              tz: string;
            };
            _input_out: {
              date: Date;
              tz: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          any
        >;
        getTeamLogo: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: import("./trpc/trpc").Context;
            _input_in: {
              teamAbbrv: string;
              logoTheme?: string | undefined;
            };
            _input_out: {
              teamAbbrv: string;
              logoTheme?: string | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          any
        >;
      }
    >;
    auth: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: import("./trpc/trpc").Context;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        loginUser: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: import("./trpc/trpc").Context;
            _input_in: {
              email: string;
              password: string;
            };
            _input_out: {
              email: string;
              password: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          mongoose.Document<unknown, {}, import("./models/User").IUser> &
            import("./models/User").IUser & {
              _id: mongoose.Types.ObjectId;
            } & {
              __v: number;
            }
        >;
        checkLoggedIn: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            loggedIn: boolean;
          }
        >;
        getSignedInUser: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            id: any;
            name: string;
            email: string;
          }
        >;
      }
    >;
    vote: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: import("./trpc/trpc").Context;
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        castVote: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: {
              userId: string;
              gameId: string;
              userName: string;
              votedFor: string;
            };
            _input_out: {
              userId: string;
              gameId: string;
              userName: string;
              votedFor: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          mongoose.Document<unknown, {}, import("./models/Vote").IVote> &
            import("./models/Vote").IVote & {
              _id: mongoose.Types.ObjectId;
            } & {
              __v: number;
            }
        >;
        getVoteByGameByUser: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: {
              gameId: string;
            };
            _input_out: {
              gameId: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          | (mongoose.Document<unknown, {}, import("./models/Vote").IVote> &
              import("./models/Vote").IVote & {
                _id: mongoose.Types.ObjectId;
              } & {
                __v: number;
              })
          | null
        >;
        getVotesByGame: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: {
              gameId: string;
            };
            _input_out: {
              gameId: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          (mongoose.Document<unknown, {}, import("./models/Vote").IVote> &
            import("./models/Vote").IVote & {
              _id: mongoose.Types.ObjectId;
            } & {
              __v: number;
            })[]
        >;
        tallyVotesForGame: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: import("./trpc/trpc").Context;
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                import("express-serve-static-core").ParamsDictionary,
                any,
                any,
                import("qs").ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
              decodedToken: string | import("jsonwebtoken").JwtPayload;
            };
            _input_in: {
              gameId: string;
              gameWinner: string;
            };
            _input_out: {
              gameId: string;
              gameWinner: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          void
        >;
      }
    >;
  }
>;
export type AppRouter = typeof appRouter;
export {};
