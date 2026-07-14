import { Module } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { QuizController } from "./quiz.controller";
import { RevisionEngineService } from "./revision-engine.service";

@Module({
  controllers: [QuizController],
  providers: [QuizService, RevisionEngineService],
  exports: [RevisionEngineService],
})
export class QuizModule {}
