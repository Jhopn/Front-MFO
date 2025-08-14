export const CircularProgress = ({ percentage, color, size = 120 }: { percentage: number; color: string; size?: number }) => {
    const radius = (size - 8) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-700" />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth="4" fill="none" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-300" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{percentage}%</span>
            </div>
        </div>
    )
}