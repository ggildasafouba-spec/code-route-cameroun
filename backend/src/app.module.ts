import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { QuizModule } from "./modules/quiz/quiz.module";
import { VideosModule } from "./modules/videos/videos.module";
import { ExamsModule } from "./modules/exams/exams.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { AutoEcolesModule } from "./modules/auto-ecoles/auto-ecoles.module";
import { CertificatesModule } from "./modules/certificates/certificates.module";
import { AdminModule } from "./modules/admin/admin.module";
import { ReferralModule } from "./modules/referral/referral.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    QuizModule,
    VideosModule,
    ExamsModule,
    PaymentsModule,
    AutoEcolesModule,
    CertificatesModule,
    AdminModule,
    ReferralModule,
  ],
})
export class AppModule {}
