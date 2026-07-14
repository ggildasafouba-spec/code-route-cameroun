import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";

// TODO: Ajouter un guard spécifique pour le rôle ADMIN
@ApiTags("Administration")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  // === DASHBOARD ===
  @Get("dashboard")
  @ApiOperation({ summary: "Statistiques globales du dashboard admin" })
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get("revenue/monthly")
  @ApiOperation({ summary: "Revenus mensuels (6 derniers mois)" })
  async getMonthlyRevenue(@Query("months") months?: string) {
    return this.adminService.getMonthlyRevenue(months ? parseInt(months) : 6);
  }

  // === UTILISATEURS ===
  @Get("users")
  @ApiOperation({ summary: "Liste des utilisateurs (paginée)" })
  async getUsers(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("role") role?: string,
    @Query("search") search?: string
  ) {
    return this.adminService.getUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
      role,
      search
    );
  }

  @Patch("users/:id/toggle-status")
  @ApiOperation({ summary: "Activer/désactiver un utilisateur" })
  async toggleUserStatus(@Param("id") id: string) {
    return this.adminService.toggleUserStatus(id);
  }

  // === AUTO-ÉCOLES ===
  @Get("auto-ecoles")
  @ApiOperation({ summary: "Liste des auto-écoles" })
  async getAutoEcoles(@Query("verified") verified?: string) {
    return this.adminService.getAutoEcoles(
      verified !== undefined ? verified === "true" : undefined
    );
  }

  @Post("auto-ecoles/:id/verify")
  @ApiOperation({ summary: "Vérifier/valider une auto-école" })
  async verifyAutoEcole(@Param("id") id: string) {
    return this.adminService.verifyAutoEcole(id);
  }

  @Patch("auto-ecoles/:id/commission")
  @ApiOperation({ summary: "Modifier le taux de commission d'une auto-école" })
  async updateCommission(
    @Param("id") id: string,
    @Body() body: { commissionRate: number }
  ) {
    return this.adminService.updateAutoEcoleCommission(
      id,
      body.commissionRate
    );
  }

  // === COMMISSIONS ===
  @Get("commissions")
  @ApiOperation({ summary: "Liste des commissions (referrals)" })
  async getCommissions(
    @Query("status") status?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    return this.adminService.getCommissions(
      status,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20
    );
  }

  @Post("commissions/:id/confirm")
  @ApiOperation({ summary: "Confirmer une commission (élève bien inscrit)" })
  async confirmCommission(@Param("id") id: string) {
    return this.adminService.confirmReferral(id);
  }

  @Post("commissions/:id/paid")
  @ApiOperation({ summary: "Marquer une commission comme payée" })
  async markPaid(@Param("id") id: string) {
    return this.adminService.markReferralPaid(id);
  }

  // === PAIEMENTS ===
  @Get("payments")
  @ApiOperation({ summary: "Liste des paiements" })
  async getPayments(
    @Query("status") status?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    return this.adminService.getPayments(
      status,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20
    );
  }

  // === CONTENU ===
  @Get("content/stats")
  @ApiOperation({ summary: "Statistiques du contenu (cours, vidéos, questions)" })
  async getContentStats() {
    return this.adminService.getContentStats();
  }
}
