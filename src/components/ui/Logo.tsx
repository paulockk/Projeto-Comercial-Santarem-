interface LogoProps {
  size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Logo({ size = 64 }: LogoProps) {
  return (
    <div>
      <img
        alt="Comercial Santarém Logo"
        className="w-full h-full object-contain"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5zceSnj-gek0iYbzrQr5j8ygQidShifvcfGa6E4lvHhSu7hCOcTGZ-zEiEuKNhLIdLqFq9f3kUpSoKhSkMCcvSxTBToGKystx9DUxQ155ddjEMlPZb8u_-Cit9p6a_IStczwlqBvOkDw8g0H0Du1aRd-ta8xl2ah2dMyz2KyCEzbWVUX9lujif-awZGcfmt7AUG9ADO2AkkfVvehUgKvATPuxlFYSFwS5oj97PfIFBVs1IzOE1zEA3j2CAjXYuxTploM"
      />
    </div>
  );
}
