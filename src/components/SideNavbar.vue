<script setup>
import { RouterLink } from "vue-router";

const getUser = localStorage.getItem("username");
</script>

<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <!-- Insert the logo at the top of the navigation bar -->
        <div class="text-center mt-3">
          <img src="@/assets/img/gain-like-service.png" alt="Logo" class="img-fluid" style="max-width: 150px" />
        </div>

        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <RouterLink class="nav-link" to="/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            แดชบอร์ด
          </RouterLink>
          <RouterLink class="nav-link" to="/orders">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            รายการออเดอร์
          </RouterLink>

          <div class="sb-sidenav-menu-heading">บริการ</div>
          <RouterLink class="nav-link" to="/blogs">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            บทความ
          </RouterLink>
          <RouterLink class="nav-link" to="/events">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            กิจกรรม
          </RouterLink>
          <RouterLink class="nav-link" to="/products">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            บริการ
          </RouterLink>
          <RouterLink class="nav-link" to="/packages">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            แพ็คเกจ
          </RouterLink>
          <RouterLink class="nav-link" to="/promotions">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            โปรโมชั่น
          </RouterLink>
          <RouterLink class="nav-link" to="/coupons">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            คูปอง
          </RouterLink>

          <div class="sb-sidenav-menu-heading">เครื่องมือ</div>
          <RouterLink class="nav-link" to="/automate">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            ตัวปั๊มออโต้
          </RouterLink>
          <RouterLink class="nav-link" to="/farm">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            ฟาร์ม
          </RouterLink>

          <div class="sb-sidenav-menu-heading">การจัดการ</div>

          <RouterLink class="nav-link" to="/tickets">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            ตั๋วแจ้งปัญหา
          </RouterLink>

          <RouterLink class="nav-link" to="/rewards">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            รางวัล
          </RouterLink>

          <RouterLink class="nav-link" to="/histories">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            ประวัติการเงิน
          </RouterLink>

          <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
              <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth"
                aria-expanded="false" aria-controls="pagesCollapseAuth">
                Authentication
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages">
                <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="login.html">Login</a>
                  <a class="nav-link" href="register.html">Register</a>
                  <a class="nav-link" href="password.html">Forgot Password</a>
                </nav>
              </div>
              <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError"
                aria-expanded="false" aria-controls="pagesCollapseError">
                Error
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages">
                <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="401.html">401 Page</a>
                  <a class="nav-link" href="404.html">404 Page</a>
                  <a class="nav-link" href="500.html">500 Page</a>
                </nav>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        {{ getUser }}
      </div>
    </nav>
  </div>
</template>
