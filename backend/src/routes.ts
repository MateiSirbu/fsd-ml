import { UserController } from "./controller/UserController";
import { DessertController } from "./controller/DessertController";

export const Routes = [
    {
        method: "post",
        route: "/login",
        controller: UserController,
        action: "login",
        guard: false
    }, {
        method: "post",
        route: "/signup",
        controller: UserController,
        action: "signUp",
        guard: false
    }, {
        method: "get",
        route: "/desserts",
        controller: DessertController,
        action: "getAllDesserts",
        guard: true
    }, {
        method: "get",
        route: "/desserts/{id}",
        controller: DessertController,
        action: "getOneDessert",
        guard: true
    }, {
        method: "post",
        route: "/desserts",
        controller: DessertController,
        action: "createDessert",
        guard: true
    }, {
        method: "delete",
        route: "/desserts/{id}",
        controller: DessertController,
        action: "deleteDessert",
        guard: true
    },
];