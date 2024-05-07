"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
var typeorm_1 = require("typeorm");
var course_1 = require("./course");
var typeorm_2 = require("typeorm");
var Consumer = /** @class */ (function () {
    function Consumer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Consumer.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Consumer.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Consumer.prototype, "duration", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Consumer.prototype, "seqNo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return course_1.Course; }, function (course) { return course.lessons; }),
        (0, typeorm_2.JoinColumn)({
            name: "courseId"
        }),
        __metadata("design:type", course_1.Course)
    ], Consumer.prototype, "course", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Consumer.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Consumer.prototype, "lastUpdatedAt", void 0);
    Consumer = __decorate([
        (0, typeorm_1.Entity)({
            name: "CONSUMERS"
        })
    ], Consumer);
    return Consumer;
}());
exports.Consumer = Consumer;
