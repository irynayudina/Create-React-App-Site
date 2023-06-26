export const languageAutocompletions = {
  'cpp': [
    {
      label: "alignas", type: "keyword", detail: "specifier",
      info: 'Specifies the alignment requirement of a type or an object.',
      apply: "alignas (expression)"
    },
    {
      label: "alignof", type: "operator", detail: "operator",
      info: 'Queries alignment requirements of a type.',
      apply: "alignof(std::max_align_t)"
    },
    {
      label: "and", type: "operator", detail: "alternative operator",
      info: 'as an alternative for && (Logical AND operator)',
      apply: "and "
    },
    {
      label: "and_eq", type: "operator", detail: "alternative operator",
      info: 'as an alternative for &=',
      apply: "and_eq "
    },
    {
      label: "asm", type: "keyword", detail: "declaration",
      info: 'Declaration of an inline assembly block',
      apply: "attr(optional) asm ( string-literal ); "
    },
    {
      label: "bitand ", type: "operator", detail: "alternative operator",
      info: ' as an alternative for |',
      apply: "bitand "
    },
    {
      label: "bitor ", type: "operator", detail: "alternative operator",
      info: ' as an alternative for &',
      apply: "bitor "
    },
    {
      label: "bool ", type: "type", detail: "type",
      info: 'as the declaration of the type',
      apply: "bool "
    },
    {
      label: "break ", type: "keyword", detail: "statement",
      info: 'as the declaration of the statement',
      apply: "break; "
    },
    {
      label: "case ", type: "keyword", detail: "label",
      info: 'as the declaration of the case label',
      apply: "case x: "
    },
    {
      label: "catch ", type: "keyword"
    },
    {
      label: "char ", type: "type"
    },
    {
      label: "char16_t ", type: "type"
    },
    {
      label: "char32_t ", type: "type"
    },
    {
      label: "class ", type: "class", detail: "definition",
      apply: `class Bar { // definition of a class
  public:
    Bar(int i) : m_i(i) {}
  private:
    int m_i;
};`
    },
    {
      label: "compl ", type: "operator", detail: "alternative operator",
      info: 'as an alternative for ~',
      apply: "compl "
    },
    {
      label: "const ", type: "keyword"
    },
    {
      label: "constexpr ", type: "keyword",
      info: 'specifies that the value of a variable or function can appear in constant expressions'
    },
    {
      label: "const_cast ", type: "keyword", detail: "convertion",
      info: 'Converts between types with different cv-qualification.',
      apply: "const_cast< new-type >( expression )"
    },
    {
      label: "continue;", type: "keyword"
    },
    {
      label: "decltype", type: "keyword", detail: "specifier",
      info: 'Inspects the declared type of an entity or the type and value category of an expression.',
      apply: "decltype ( expression )	"
    },
    {
      label: "default", type: "keyword"
    },
    {
      label: "delete", type: "keyword"
    },
    {
      label: "do-while", type: "function", detail: "loop",
      info: 'Executes a statement repeatedly, until the value of expression becomes false',
      apply: "do statement while ( expression );"
    },
    {
      label: "double", type: "type"
    },
    {
      label: "dynamic_cast", type: "keyword", detail: "conversion",
      info: 'Safely converts pointers and references to classes up, down, and sideways along the inheritance hierarchy.',
      apply: "dynamic_cast< new-type >( expression );"
    },
    {
      label: "else", type: "keyword"
    },
    {
      label: "enum", type: "class", detail: "declaration",
      apply: "enum color { red, yellow, green = 20, blue };"
    },
    {
      label: "explicit", type: "keyword", detail: "specifier",
      info: 'Specifies that a constructor or conversion function (since C++11)or deduction guide (since C++17) is explicit, that is, it cannot be used for implicit conversions and copy-initialization.',
      apply: "explicit "
    },
    {
      label: "export", type: "keyword"
    },
    {
      label: "extern", type: "keyword"
    },
    {
      label: "false", type: "keyword"
    },
    {
      label: "float", type: "variable"
    },
    {
      label: "for", type: "function", detail: "loop",
      info: 'Executes init-statement once, then executes statement and iteration-expression repeatedly, until the value of condition becomes false.',
      apply: "for ( declaration-or-expression (optional) ; condition (optional) ; expression (optional) ) statement		 "
    },
    {
      label: "goto label;", type: "keyword"
    },
    {
      label: "if", type: "function", detail: "statement",
      apply: `if (i > 2){
  std::cout << i << " is greater than 2";}
else{
  std::cout << i << " is not greater than 2";}`
    },
    {
      label: "inline ", type: "keyword"
    },
    {
      label: "int ", type: "type"
    },
    {
      label: "long", type: "type"
    },
    {
      label: "mutable", type: "keyword"
    },
    {
      label: "namespace", type: "keyword"
    },
    {
      label: "new", type: "variable"
    },
    {
      label: "noexcept ", type: "operator", detail: "operator",
      info: 'performs a compile-time check that returns true if an expression is declared to not throw any exceptions.',
      apply: "noexcept( expression )"
    },
    {
      label: "not", type: "keyword",
      info: 'as an alternative for !'
    },
    {
      label: "not_eq", type: "keyword",
      info: 'as an alternative for !='
    },
    {
      label: "nullptr", type: "keyword",
    },
    {
      label: "operator", type: "operator", detail: "overloading",
      info: 'Customizes the C++ operators for operands of user-defined types.',
      apply: "operator op"
    },
    {
      label: "or", type: "keyword",
      info: 'as an alternative for ||'
    },
    {
      label: "or_eq", type: "keyword",
      info: 'as an alternative for |='
    },
    {
      label: "private", type: "type"
    },
    {
      label: "protected", type: "type"
    },
    {
      label: "public", type: "type"
    },
    {
      label: "register", type: "keyword"
    },
    {
      label: "reinterpret_cast", type: "keyword", detail: "conversion",
      info: 'Converts between types by reinterpreting the underlying bit pattern.',
      apply: "reinterpret_cast< new-type >( expression )"
    },
    {
      label: "return", type: "keyword"
    },
    {
      label: "short", type: "type"
    },
    {
      label: "signed", type: "type"
    },
    {
      label: "sizeof(var)", type: "keyword"
    },
    {
      label: "static", type: "keyword"
    },
    {
      label: "static_assert", type: "keyword"
    },
    {
      label: "static_cast", type: "keyword"
    },
    {
      label: "struct", type: "keyword"
    },
    {
      label: "switch ", type: "function", detail: "statement",
      info: 'Transfers control to one of several statements, depending on the value of a condition.',
      apply: `switch (1)
  {
    case 1:
      int x = 0; // initialization
      std::cout << x;
      break;
    default:
      // compilation error: jump to default:
      // would enter the scope of 'x' without initializing it
      std::cout << "default";
      break;
  }`
    },
    {
      label: "template", type: "class",
      info: 'C++ entity that defines one of the following: an alias to a family of types or variables, a concept',
      apply: "template < parameter-list > requires-clause(optional) declaration"
    },
    {
      label: "this", type: "keyword"
    },
    {
      label: "thread_local", type: "keyword"
    },
    {
      label: "throw", type: "keyword"
    },
    {
      label: "true", type: "variable"
    },
    {
      label: "try ", type: "function", detail: "block",
      info: 'Associates one or more exception handlers (catch-clauses) with a compound statement.',
      apply: `try
{
    f();
}
catch (const std::overflow_error& e)
{} // this executes if f() throws std::overflow_error (same type rule)
catch (const std::runtime_error& e)
{} // this executes if f() throws std::underflow_error (base class rule)
catch (const std::exception& e)
{} // this executes if f() throws std::logic_error (base class rule)
catch (...)
{} // this executes if f() throws std::string or int or any other unrelated type`
    },
    {
      label: "typedef", type: "keyword"
    },
    {
      label: "typeid", type: "keyword"
    },
    {
      label: "typename", type: "keyword"
    },
    {
      label: "union", type: "keyword"
    },
    {
      label: "unsigned", type: "type"
    },
    {
      label: "using", type: "keyword", detail: "namespace std",
      apply:'using namespace std;'
    },
    {
      label: "virtual", type: "type"
    },
    {
      label: "void", type: "type"
    },
    {
      label: "volatile", type: "type"
    },
    {
      label: "wchar_t", type: "type"
    },
    {
      label: "while", type: "function",
      apply:`while (condition)
{
  actions
}`
    },
    {
      label: "xor", type: "keyword", info:'analog for ^'
    },
    {
      label: "xor_eq", type: "keyword", info:'analog for ^='
    },
    {
      label: "#include", type: "keyword", detail: "<stdio.h>",
      info: "Insert standard header file", apply: "#include <stdio.h>"
    },
    {
      label: "#include", type: "keyword", detail: "\"my_file.h\"",
      info: "Insert custom header file", apply: "#include \"my_file.h\""
    },
    {
      label: "cout", type: "text", detail: " >> item ;",
      info: "print to console", apply: "cout >> item ;"
    },
    {label: "function",
      type: "function",
      apply: `type name(parameters) {
calculations;
return value;
}`},
    {
      label: "max", 
      type: "function",
      apply: `int max(int a, int b, int c)
{
  int m = (a > b) ? a : b;
  return (m > c) ? m : c;
}`},
    {label: "hello", type: "variable", info: "(World)"},
    { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" },
    {label: "add",
      type: "function",
      apply: "function add(a, b) {\n  return a + b;\n}"},
],
  'java': [
    { label: "jav", type: "keyword" },
    {
      label: "try", type: "keyword", detail: "...catch",
      info:'Creates a try...catch statement', apply: `try {
  
} catch (Exception e) {
  System.out.println("Something went wrong.");
}`
    },
    {
      label: "while", type: "keyword", detail: "loop",
      info:'Creates a while loop', apply: `while (i < 5) {
  System.out.println(i);
  i++;
}`
    },
    {
      label: "do ... while", type: "keyword", detail: "loop",
      info: 'Used together with while to create a do-while loop',
      apply: `do {
System.out.println(i);
i++;
}
while (i < 5);`
    },
    {
      label: "var", type: "keyword",
      info:'Declares a variable. New in Java 10'
    },
    {
      label: "volatile", type: "keyword",
      info:'Indicates that an attribute is not cached thread-locally, and is always read from the "main memory"'
    },
    {
      label: "void", type: "keyword",
      info:'Specifies that a method should not have a return value'
    },
    {
      label: "transient", type: "keyword",
      info:'A non-accesss modifier, which specifies that an attribute is not part of an object\'s persistent state'
    },
    {
      label: "throws", type: "keyword", detail:'Exception',
      apply:`throws Exception`, info:`Indicates what exceptions may be thrown by a method`
    },
    {
      label: "throw", type: "keyword", detail: 'new Exception',
      apply:`throw new Exception("Message")`, info:'Creates a custom error'
    },
    {
      label: "this", type: "keyword",
      info:`Refers to the current object in a method or constructor`
    },
    {
      label: "synchronized", type: "keyword",
      info:`A non-access modifier, which specifies that methods can only be accessed by one thread at a time`
    },
    {
      label: "switch", type: "function", detail:'statement',
      info:'Selects one of many code blocks to be executed', apply:`switch (var) {
case 1:
  // action
  break;
case 2:
  //action
  break;
// other cases
}`
    },
    {
      label: "super", type: "keyword",
      info:'Refers to superclass (parent) objects'
    },
    {
      label: "strictfp", type: "keyword",
      info: 'Restrict the precision and rounding of floating point calculations'
    },
    {
      label: "static", type: "keyword",
      info:'A non-access modifier used for methods and attributes. Static methods/attributes can be accessed without creating an object of a class'
    },
    {
      label: "short", type: "type",
      info:'A data type that can store whole numbers from -32768 to 32767'
    },
    {
      label: "return", type: "keyword",
      info:'Finished the execution of a method, and can be used to return a value from a method'
    },
    {
      label: "requires", type: "keyword",
      info:'Specifies required libraries inside a module. New in Java 9'
    },
    {
      label: "public", type: "keyword",
      info:'An access modifier used for classes, attributes, methods and constructors, making them accessible by any other class'
    },{
      label: "protected", type: "keyword",
      info:'An access modifier used for attributes, methods and constructors, making them accessible in the same package and subclasses'
    },
    {
      label: "private", type: "keyword",
      info:'An access modifier used for attributes, methods and constructors, making them only accessible within the declared class'
    },
    {
      label: "package", type: "keyword",
      info:'Declares a package'
    },
    {
      label: "new", type: "keyword",
      info:'Creates new objects'
    },
    {
      label: "native", type: "keyword",
      info:'Specifies that a method is not implemented in the same Java source file (but in another language)'
    },{
      label: "module", type: "keyword",
      info:'Declares a module. New in Java 9'
    },{
      label: "long", type: "type",
      info:'A data type that can store whole numbers from -9223372036854775808 to 9223372036854775808'
    },{
      label: "int", type: "type",
      info:'A data type that can store whole numbers from -2147483648 to 2147483647'
    },{
      label: "interface", type: "keyword",
      info:'Used to declare a special type of class that only contains abstract methods'
    },{
      label: "instanceof ", type: "keyword", 
      info:'Checks whether an object is an instance of a specific class or an interface'
    },{
      label: "import", type: "keyword",
      info:'Used to import a package, class or interface'
    },{
      label: "implements", type: "keyword",
      info:'Implements an interface'
    },{
      label: "if", type: "keyword", detail: " (){}",
      info:'Makes a conditional statement', apply:`if () {
//
}`
    },{
      label: "for", type: "function", detail: 'loop',
      info:"Create a for loop",apply:`for(;;;) {
//
}`
    },
    {
      label: "float", type: "type",
      info:'A data type that can store whole numbers from 3.4e−038 to 3.4e+038'
    },
    {
      label: "finally", type: "keyword",
      info: 'Used with exceptions, a block of code that will be executed no matter if there is an exception or not',
      apply: `finally {
//
}`
    },
    {
      label: "final", type: "keyword",
      info:'A non-access modifier used for classes, attributes and methods, which makes them non-changeable (impossible to inherit or override)'
    },
    {
      label: "extends", type: "keyword",
      info:'Extends a class (indicates that a class is inherited from another class)'
    },{
      label: "export", type: "keyword",
      info:'Exports a package with a module. New in Java 9'
    },
    {
      label: "enum", type: "class", 
      info:'Declares an enumerated (unchangeable) type', apply:`enum Level {
  LOW,
  MEDIUM,
  HIGH
}`
    },{
      label: "else", type: "keyword",
      apply:`else{}`, info:'Used in conditional statements'
    },{
      label: "double", type: "type",
      info:'A data type that can store whole numbers from 1.7e−308 to 1.7e+308'
    },{
      label: "default:", type: "keyword",
      info:'Specifies the default block of code in a switch statement'
    },{
      label: "const", type: "keyword",
      info:'Defines a constant. Not in use - use final instead'
    },{
      label: "continue;", type: "keyword",
      info:'Continues to the next iteration of a loop'
    },{
      label: "class", type: "class", detail: 'definition',
      info:'Defines a class', apply:`access_modifeir class Name{
  //
}`
    },{
      label: "char", type: "type",
      info:'A data type that is used to store a single character'
    },{
      label: "catch(Exception e)", type: "keyword",
      info:'Catches exceptions generated by try statements'
    },{
      label: "case 1:", type: "keyword",
      info:'Marks a block of code in switch statements'
    },{
      label: "byte", type: "type",
      info:'A data type that can store whole numbers from -128 and 127'
    },{
      label: "breack;", type: "keyword",
      info:'Breaks out of a loop or a switch block'
    },{
      label: "boolean", type: "type",
      info:'A data type that can only store true and false values'
    },{
      label: "assert", type: "keyword",
      info:'For debugging'
    },{
      label: "abstract", type: "keyword",
      info: `A non-access modifier. Used for classes and methods: 
      An abstract class cannot be used to create objects (to access it, it must be inherited from another class). 
      An abstract method can only be used in an abstract class, and it does not have a body. 
      The body is provided by the subclass (inherited from)`
    },
  ],
  'csharp':[
    {
      label: "abstract", type: "keyword",
      info: "Indicates that a class or member is incomplete and must be implemented by a derived class.",
      apply: "abstract"
    },
    {
      label: "as", type: "keyword",
      info: "Performs a non-nullable type conversion.",
      apply: "as"
    },
    {
      label: "base", type: "keyword",
      info: "Refers to the base class of the current instance.",
      apply: "base"
    },
    {
      label: "bool", type: "type",
      info: "Represents a Boolean value of true or false.",
      apply: "bool"
    },
    {
      label: "break", type: "keyword",
      info: "Terminates the nearest enclosing loop or switch statement.",
      apply: "break"
    },
    {
      label: "case", type: "keyword",
      info: "Labels a statement within a switch statement.",
      apply: "case value:"
    },
    {
      label: "catch", type: "keyword",
      info: "Catches an exception thrown in the try block.",
      apply: "catch (Exception ex) { }"
    },
    {
      label: "char", type: "type",
      info: "Represents a Unicode character.",
      apply: "char"
    },
    {
      label: "checked", type: "keyword",
      info: "Enables overflow checking for integral-type arithmetic operations and conversions.",
      apply: "checked"
    },
    {
      label: "class", type: "keyword",
      info: "Defines a reference type.",
      apply: "class MyClass { }"
    },
    {
      label: "const", type: "keyword",
      info: "Declares a constant.",
      apply: "const int value = 42;"
    },
    {
      label: "continue", type: "keyword",
      info: "Skips to the next iteration of the nearest enclosing loop statement.",
      apply: "continue;"
    },
    {
      label: "decimal", type: "type",
      info: "Represents a decimal number.",
      apply: "decimal"
    },
    {
      label: "default", type: "keyword",
      info: "Labels the default case in a switch statement.",
      apply: "default:"
    },
    {
      label: "delegate", type: "keyword",
      info: "Defines a reference type that can encapsulate a method with a specific signature.",
      apply: "delegate int MyDelegate(string s);"
    },
    {
      label: "do", type: "keyword",
      info: "Starts a do-while loop.",
      apply: "do {\n  // code block\n} while (condition);"
    },
    {
      label: "double", type: "type",
      info: "Represents a double-precision floating-point"
    },
      {
        label: "bool",
        type: "keyword",
        info: "Represents a Boolean (true or false) value",
        apply: "bool"
      },
      {
        label: "byte",
        type: "keyword",
        info: "Represents an 8-bit unsigned integer",
        apply: "byte"
      },
      {
        label: "sbyte",
        type: "keyword",
        info: "Represents an 8-bit signed integer",
        apply: "sbyte"
      },
      {
        label: "char",
        type: "keyword",
        info: "Represents a single Unicode character",
        apply: "char"
      },
      {
        label: "decimal",
        type: "keyword",
        info: "Represents a decimal value with 28-29 significant digits",
        apply: "decimal"
      },
      {
        label: "double",
        type: "keyword",
        info: "Represents a double-precision floating-point number",
        apply: "double"
      },
      {
        label: "float",
        type: "keyword",
        info: "Represents a single-precision floating-point number",
        apply: "float"
      },
      {
        label: "int",
        type: "keyword",
        info: "Represents a 32-bit signed integer",
        apply: "int"
      },
      {
        label: "uint",
        type: "keyword",
        info: "Represents a 32-bit unsigned integer",
        apply: "uint"
      },
      {
        label: "long",
        type: "keyword",
        info: "Represents a 64-bit signed integer",
        apply: "long"
      },
      {
        label: "ulong",
        type: "keyword",
        info: "Represents a 64-bit unsigned integer",
        apply: "ulong"
      },
      {
        label: "object",
        type: "keyword",
        info: "Represents any type of object",
        apply: "object"
      },
      {
        label: "short",
        type: "keyword",
        info: "Represents a 16-bit signed integer",
        apply: "short"
      },
      {
        label: "ushort",
        type: "keyword",
        info: "Represents a 16-bit unsigned integer",
        apply: "ushort"
      },
      {
        label: "string",
        type: "keyword",
        info: "Represents a sequence of Unicode characters",
        apply: "string"
      },
      {
        label: "this",
        type: "keyword",
        info: "Refers to the current object in a method or constructor",
        apply: "this"
      },
      {
        label: "switch",
        type: "function",
        info: "Selects one of many code blocks to be executed",
        apply: "switch (expression) {\n  case constant-expression:\n    // statements\n    break;\n  default:\n    // statements\n    break;\n}"
      }
  ],
  'python2': [
    {
      label: "and",
      type: "keyword",
      info: "A logical operator that returns True if both operands are True",
      apply: "and"
    },
    {
      label: "as",
      type: "keyword",
      info: "Used to create an alias for a module, class or function",
      apply: "as"
    },
    {
      label: "assert",
      type: "keyword",
      info: "Used for debugging purposes to check if a condition is True",
      apply: "assert expression"
    },
    {
      label: "break",
      type: "keyword",
      info: "Used to exit a loop or switch statement",
      apply: "break"
    },
    {
      label: "class",
      type: "keyword",
      info: "Used to define a class",
      apply: "class ClassName:"
    },
    {
      label: "continue",
      type: "keyword",
      info: "Used to skip the current iteration of a loop",
      apply: "continue"
    },
      {
        label: "def",
        type: "keyword",
        info: "Defines a function",
        apply: "def function_name(parameters):\n    # function body"
      },
      {
        label: "elif",
        type: "keyword",
        info: "Used for additional if statements",
        apply: "elif condition:\n    # statement(s)"
      },
      {
        label: "else",
        type: "keyword",
        info: "Used if none of the if or elif conditions are true",
        apply: "else:\n    # statement(s)"
      },
      {
        label: "except",
        type: "keyword",
        info: "Used to catch exceptions that are raised",
        apply: "try:\n    # statement(s)\nexcept exception_type:\n    # statement(s)"
      },
      {
        label: "finally",
        type: "keyword",
        info: "Used to specify a block of code that will be executed no matter what",
        apply: "try:\n    # statement(s)\nfinally:\n    # statement(s)"
      },
      {
        label: "for",
        type: "keyword",
        info: "Used to iterate over a sequence (such as a list, tuple, or string)",
        apply: "for variable in sequence:\n    # statement(s)"
      },
      {
        label: "from",
        type: "keyword",
        info: "Used to import specific parts of a module",
        apply: "from module_name import function_name"
      },
      {
        label: "global",
        type: "keyword",
        info: "Used to declare a global variable",
        apply: "global variable_name"
      },
      {
        label: "if",
        type: "keyword",
        info: "Used for conditional statements",
        apply: "if condition:\n    # statement(s)"
      },
      {
        label: "import",
        type: "keyword",
        info: "Used to import modules or packages",
        apply: "import module_name"
      },
      {
        label: "in",
        type: "keyword",
        info: "Used to test if a sequence contains a certain value",
        apply: "if value in sequence:\n    # statement(s)"
      },
      {
        label: "is",
        type: "keyword",
        info: "Used to test if two variables are the same object",
        apply: "if variable1 is variable2:\n    # statement(s)"
      },
      {
        label: "lambda",
        type: "keyword",
        info: "Used to create anonymous functions",
        apply: "lambda arguments: expression"
      },
      {
        label: "not",
        type: "keyword",
        info: "Used to invert a boolean value",
        apply: "if not condition:\n    # statement(s)"
      },
      {
        label: "or",
        type: "keyword",
        info: "Used for boolean logic",
        apply: "if condition1 or condition2:\n    # statement(s)"
      },
      {
        label: "pass",
        type: "keyword",
        info: "Used as a placeholder when a statement is required but no action is needed",
        apply: "def function_name(parameters):\n    # function body\n    pass"
      },
      {
        label: "print",
        type: "function",
        info: "Used to print values to the console",
        apply: "print(value1, value2, ...)"
      },
     
    ]    
}