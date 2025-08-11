import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export interface FinancialAsset {
  id: string
  name: string
  value: number
  percentage: number
  type: "fund" | "crypto" | "stock"
}

export interface RealEstateAsset {
  id: string
  name: string
  value: number
  type: "house" | "apartment"
}

export interface DashboardData {
  totalAllocated: number
  totalPercentage: number
  allocationDate: string
  financialAssets: FinancialAsset[]
  realEstateAssets: RealEstateAsset[]
  indicators: {
    retirement: { age: number; years: number }
    desiredIncome: number
    targetYield: string
  }
  pgbl: {
    target: number
    current: number
  }
  goals: {
    sports: { target: number; current: number }
    yield: { target: number; current: number }
  }
  allocation: {
    cash: number
    fixedIncome: number
    pension: number
    investmentFunds: number
    alternatives: number
  }
}


export const dashboardApi = {
  getDashboardData: (): Promise<DashboardData> => api.get("/dashboard").then((res) => res.data),

  updateAllocation: (data: Partial<DashboardData>) => api.put("/dashboard/allocation", data).then((res) => res.data),
}
