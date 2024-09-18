def celsius_para_kelvin(celsius):
    return celsius + 273.15

def celsius_para_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def main():
    try:
        celsius = float(input("Digite a temperatura em Celsius: "))
        kelvin = celsius_para_kelvin(celsius)
        fahrenheit = celsius_para_fahrenheit(celsius)
        
        print(f"Temperatura em Kelvin: {kelvin:.2f} K")
        print(f"Temperatura em Fahrenheit: {fahrenheit:.2f} °F")
    except ValueError:
        print("Por favor, insira um valor numérico válido.")

if __name__ == "__main__":
    main()
