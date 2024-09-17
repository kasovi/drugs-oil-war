document.addEventListener('DOMContentLoaded', function() {
    // Example data
    const data = [30, 80, 45, 60, 20, 90, 55];
    
    // Set dimensions and margins
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    
    // Create SVG element
    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
        .domain(data.map((d, i) => i))
        .range([0, width])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .nice()
        .range([height, 0]);
    
    // Append bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => x(i))
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', '#69b3a2');
    
    // Add x-axis
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(i => i + 1));
    
    // Add y-axis
    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
});
