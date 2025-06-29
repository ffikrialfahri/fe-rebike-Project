// Konfigurasi untuk chart Mitra
export const mitraChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [{
        label: 'Pendapatan (juta Rp)',
        data: [3.5, 4.2, 3.8, 5.0, 4.5, 5.2],
        backgroundColor: 'rgba(13, 148, 136, 0.7)',
        borderColor: 'rgba(13, 148, 136, 1)',
        borderWidth: 1,
        borderRadius: 5
    }]
};

// Konfigurasi untuk chart Admin
export const adminChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
        {
            label: 'Pelanggan',
            data: [200, 350, 500, 700, 950, 1250],
            borderColor: 'rgb(13, 148, 136)',
            backgroundColor: 'rgba(13, 148, 136, 0.1)',
            tension: 0.3,
            fill: true
        },
        {
            label: 'Mitra',
            data: [10, 15, 22, 30, 41, 50],
            borderColor: 'rgb(51, 65, 85)',
            backgroundColor: 'rgba(51, 65, 85, 0.1)',
            tension: 0.3,
            fill: true
        }
    ]
};

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, grid: { drawOnChartArea: false } }, x: { grid: { drawOnChartArea: false } } },
    plugins: {
        legend: { position: 'top' },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
        }
    }
};