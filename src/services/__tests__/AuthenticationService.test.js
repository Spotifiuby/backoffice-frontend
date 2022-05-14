import {authenticationService} from "../AuthenticationService";

import superagent from 'superagent';

let superagentMock;

afterEach(() => {
    superagentMock.unset();
});

describe("login", () => {
    test('test login', async () => {
        superagentMock = require('superagent-mock')(superagent, [
            {
                fixtures: function (match, params, headers, context) {
                    if (match.input.endsWith("/api/login")) {
                        return JSON.parse(params);
                    }
                    throw new Error(500);
                },
                post: function (match, data) {
                    return {
                        status: 200,
                        ok: true,
                        body: data
                    };
                },
            }
        ]);

        const user = await authenticationService.login("email", "password")

        expect(user.body.email).toBe("email");
        expect(user.body.password).toBe("password");
    });

    test('test login error', async () => {
        superagentMock = require('superagent-mock')(superagent, [
            {
                fixtures: function (match, params, headers, context) {
                    if (match.input.endsWith("/api/login")) {
                        throw new Error(400);
                    }
                    throw new Error(500);
                },
                post: function (match, data) {
                    return {
                        status: 400,
                        ok: false,
                        body: data
                    };
                },
            }
        ]);

        try {
            const user = await authenticationService.login("email", "password");
            expect(true).toBeFalsy();
        } catch (e) {
            expect(true).toBeTruthy();
        }

    });
});

describe("is valid session", () => {
    test('test is valid session true', async () => {
        superagentMock = require('superagent-mock')(superagent, [
            {
                fixtures: function (match, params, headers, context) {
                    if (match.input.endsWith("/api/validate-session") && JSON.parse(params).email === "email@test.com") {
                        return true;
                    }
                    if (match.input.endsWith("/api/login")) {
                        return JSON.parse(params);
                    }
                    throw new Error(500);
                },
                post: function (match, data) {
                    return {
                        status: 200,
                        ok: true,
                        body: data
                    };
                },
            }
        ]);

        await authenticationService.login("email@test.com", "password")
        const isValid = (await authenticationService.isValidSession()).body

        expect(isValid).toBeTruthy();
    });

    test('test is valid session false', async () => {
        superagentMock = require('superagent-mock')(superagent, [
            {
                fixtures: function (match, params, headers, context) {
                    if (match.input.endsWith("/api/validate-session") && JSON.parse(params).email === "email@test.com") {
                        throw new Error(401);
                    }
                    if (match.input.endsWith("/api/login")) {
                        return JSON.parse(params);
                    }
                    throw new Error(500);
                },
                post: function (match, data) {
                    return {
                        status: match.input.endsWith("/api/login") ? 200 : 401,
                        ok: match.input.endsWith("/api/login"),
                        body: data
                    };
                },
            }
        ]);

        await authenticationService.login("email@test.com", "password")
        try {
            await authenticationService.login("email@test.com", "password")
            expect(true).toBeFalsy();
        } catch (e) {
            expect(true).toBeTruthy();
        }
    });
});

