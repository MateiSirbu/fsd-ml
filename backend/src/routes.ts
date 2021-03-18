import { UserController } from "./controller/UserController";
import { DessertController } from "./controller/DessertController";

export const Routes = [
    {
        method: "post",
        route: "/login",
        controller: UserController,
        action: "login",
        restricted: false
    }, {
        method: "post",
        route: "/signup",
        controller: UserController,
        action: "signUp",
        restricted: false
    }, {
        method: "get",
        route: "/desserts",
        controller: DessertController,
        action: "getAllDesserts",
        restricted: true
    }, {
        method: "get",
        route: "/desserts/{id}",
        controller: DessertController,
        action: "getOneDessert",
        restricted: true
    }, {
        method: "post",
        route: "/desserts",
        controller: DessertController,
        action: "createDessert",
        restricted: true
    }, {
        method: "delete",
        route: "/desserts/{id}",
        controller: DessertController,
        action: "deleteDessert",
        restricted: true
    },
];